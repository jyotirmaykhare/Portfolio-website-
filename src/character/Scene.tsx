import { useEffect, useRef } from "react";
import * as THREE from "three";
import loadEncryptedCharacter from "./character";
import setLighting from "./lighting";
import { useLoading } from "../context/LoadingProvider";
import handleResize from "./resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./mouseUtils";
import setAnimations from "./animationUtils";
import { gsap, ScrollTrigger } from "./gsapSetup";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;
  // Holds a function that begins the intro once the model AND loader are ready.
  const beginIntroRef = useRef<() => void>(() => {});

  // React to loader completion (single source of truth) and start the intro.
  useEffect(() => {
    if (!isLoading) beginIntroRef.current();
  }, [isLoading]);

  useEffect(() => {
    const containerEl = canvasDiv.current;
    if (!containerEl) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    const scene = new THREE.Scene();
    let rect = containerEl.getBoundingClientRect();

    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerEl.appendChild(renderer.domElement);

    // --- Camera rig --------------------------------------------------------
    // Framing is COMPUTED FROM THE MODEL once it loads (frameCamera() in the
    // load handler below) instead of using magic world-space constants — the
    // old hardcoded (0, 13.1, 10) + 14.5° FOV left only ~2 world units visible
    // and rendered nothing but the top of the character's head.
    // HERO frames the head + PC; EXIT pulls straight back along the view axis
    // while keeping the SAME look-at target, so during scroll the scene
    // recedes INTO frame instead of sliding/cropping out of it.
    let CAM_POS_HERO = new THREE.Vector3(0, 13, 40);
    let CAM_POS_EXIT = new THREE.Vector3(0, 13, 80);
    let LOOK_TARGET = new THREE.Vector3(0, 13, 0);

    const camera = new THREE.PerspectiveCamera(
      14.5,
      rect.width / rect.height,
      0.1,
      1000
    );
    camera.position.copy(CAM_POS_HERO);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();
    camera.lookAt(LOOK_TARGET);

    // --- Desktop framing ---------------------------------------------------
    // Shift the character into the RIGHT half of the screen (the hero text is
    // stacked on the left). Uses setViewOffset, which translates the rendered
    // subject in pure screen-space — independent of FOV, zoom and model scale,
    // unlike nudging world coordinates. Cleared on smaller viewports where the
    // character stays centred under/behind the mobile text layout.
    const DESKTOP_SHIFT = 0.2; // fraction of the canvas width to push right
    const applyViewOffset = () => {
      const w = containerEl.clientWidth;
      const h = containerEl.clientHeight;
      if (window.innerWidth >= 1025 && w > 0 && h > 0) {
        camera.setViewOffset(
          w,
          h,
          -w * DESKTOP_SHIFT, // negative x => subject moves right
          0,
          w,
          h
        );
      } else {
        camera.clearViewOffset();
      }
      camera.updateProjectionMatrix();
    };
    applyViewOffset();

    // Recompute the rig from the loaded model's bounding box so framing is
    // correct no matter what scale/position the asset was authored at.
    // `frameHeight` = world-space height that should fill the viewport.
    const frameCamera = (model: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(model);
      if (box.isEmpty()) return;
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      if (size.y <= 0) return;
      const distanceFor = (worldHeight: number) =>
        worldHeight /
        2 /
        Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) /
        camera.zoom;
      // HERO: upper ~70% of the asset (face + PC). EXIT: full model plus
      // breathing room above the head and below the feet.
      const heroH = size.y * 0.7;
      const exitH = size.y * 1.4;
      LOOK_TARGET.set(center.x, box.max.y - heroH / 2, center.z);
      CAM_POS_HERO.set(center.x, LOOK_TARGET.y, center.z + distanceFor(heroH));
      CAM_POS_EXIT.set(center.x, LOOK_TARGET.y, center.z + distanceFor(exitH));
      camera.position.copy(CAM_POS_HERO);
      camera.lookAt(LOOK_TARGET);
    };

    // Scrubbed progress value written by ScrollTrigger and consumed by the
    // render loop: 0 = hero pose, 1 = fully scrolled past the hero section.
    let scrollProgress = 0;

    let headBone: THREE.Object3D | null = null;
    let screenLight: any = null;
    let mixer: THREE.AnimationMixer | undefined;
    const clock = new THREE.Clock();
    const light = setLighting(scene);

    let modelReady = false;
    let introStarted = false;
    let animations: ReturnType<typeof setAnimations> | null = null;

    const tryIntro = () => {
      if (!modelReady || introStarted || isLoadingRef.current) return;
      introStarted = true;
      light.turnOnLights();
      animations?.startIntro();
    };
    beginIntroRef.current = tryIntro;

    let cancelled = false;
    loadEncryptedCharacter().then((res) => {
      if (cancelled || !res) return;
      animations = setAnimations(res.gltf);
      if (hoverDivRef.current) animations.hover(res.gltf, hoverDivRef.current);
      mixer = animations.mixer;
      scene.add(res.scene);
      frameCamera(res.scene);
      headBone = res.scene.getObjectByName("spine006") || null;
      screenLight = res.scene.getObjectByName("screenlight") || null;
      // Trigger the rim-light animation + reveal glow on model load.
      canvasDiv.current?.parentElement?.classList.add("character-loaded");
      modelReady = true;
      tryIntro();
    });

        let mouse = { x: 0, y: 0 },
      interpolation = { x: 0.15, y: 0.3 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };
    let debounce: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = window.setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

        // (onResize is defined below alongside the ScrollTrigger setup)

        // Light brush of scroll influence on the model, kept to the hero only.
    // Uses gsap.matchMedia so the trigger is automatically created on desktop
    // and killed when the user resizes below the breakpoint (avoids stale
    // triggers and "jumping" camera on mobile↔desktop transitions).
    const mm = gsap.matchMedia();
    let scrollTween: gsap.core.Tween | null = null;

    mm.add("(min-width: 1025px)", () => {
      // Drive a single progress value; the render loop maps it onto the
      // camera rig. scrub: 0.8 = smooth follow-through without lag, and the
      // onUpdate callback keeps precision 1:1 with actual scroll position.
      const proxy = { p: 0 };
      scrollTween = gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#landingDiv",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          scrollProgress = proxy.p;
        },
      });
      return () => {
        scrollTween?.scrollTrigger?.kill();
        scrollTween?.kill();
        scrollTween = null;
        scrollProgress = 0;
      };
    });

    const onResize = () => {
      handleResize(renderer, camera, { current: containerEl });
      // Re-apply the desktop right-shift with the new canvas dimensions and
      // re-measure all ScrollTriggers for the new layout.
      applyViewOffset();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      // Cap delta so returning from a background tab doesn't produce a
      // giant interpolation jump (a classic cause of "stuck / snapped" pose).
      const delta = Math.min(clock.getDelta(), 0.1);

      if (headBone) {
        // Refresh-rate independent smoothing: converts the tuned 60 Hz lerp
        // factors into exponential damping, so head tracking feels identical
        // and precise on 60 Hz, 120 Hz or during an FPS dip.
        const dampX = 1 - Math.pow(1 - interpolation.x, delta * 60);
        const dampY = 1 - Math.pow(1 - interpolation.y, delta * 60);
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          dampX,
          dampY,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }

      // Camera rig: interpolate between hero/exit poses each frame while the
      // look-at target stays locked on the character. The scene shrinks into
      // frame as you scroll instead of being cropped by the canvas edge.
      camera.position.lerpVectors(CAM_POS_HERO, CAM_POS_EXIT, scrollProgress);
      camera.lookAt(LOOK_TARGET);

      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };
    animate();

        return () => {
      cancelled = true;
      // matchMedia.revert() kills the ScrollTrigger and tween created inside
      // its callback — handles desktop↔mobile breakpoint transitions.
      mm.revert();
      cancelAnimationFrame(rafId);
      window.clearTimeout(debounce);
      scrollTween?.scrollTrigger?.kill();
      scrollTween?.kill();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      scene.clear();
      renderer.dispose();
      if (containerEl.contains(renderer.domElement)) {
        containerEl.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
