import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./characterStage.css";
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
    // Phones don't need 2× supersampling on a full-page canvas — 1.5× keeps
    // the character crisp while roughly halving GPU fill rate (battery +
    // sustained frame rate on low-end devices).
    const maxDpr = window.innerWidth < 768 ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerEl.appendChild(renderer.domElement);

    // --- Camera rig --------------------------------------------------------
    // Framing is COMPUTED FROM THE MODEL once it loads (frameCamera() in the
    // load handler below) instead of using magic world-space constants.
    // Three poses, all sharing ONE look-at target locked to the FACE:
    //   FACE   — tight close-up of the head: the opening pose. The face fills
    //            the screen and tracks the cursor (Akash's first animation).
    //   REVEAL — head + PC framing: where Animation 1 zooms OUT to as the
    //            hero scrolls away (the face shrinks into the full character).
    //   EXIT   — full model with breathing room: Animation 2's orbit pulls
    //            back toward this radius. All poses pull along the view axis
    //            so the scene recedes INTO frame instead of cropping out.
    // Exact opening camera from Akash's Character/Scene.tsx.  This model is
    // authored around this world-space composition; auto-fitting its bounds
    // frames the desk monitor instead of the person's face.
    let CAM_POS_FACE = new THREE.Vector3(0, 13.1, 24.7);
    let CAM_POS_REVEAL = new THREE.Vector3(0, 13.1, 32);
    let CAM_POS_EXIT = new THREE.Vector3(0, 13.1, 80);
    let LOOK_TARGET = new THREE.Vector3(0, 13.1, 0);

    const camera = new THREE.PerspectiveCamera(
      14.5,
      rect.width / rect.height,
      0.1,
      1000
    );
    camera.position.copy(CAM_POS_FACE);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();
    camera.lookAt(LOOK_TARGET);

    // --- Desktop screen-space choreography ---------------------------------
    // Implemented with setViewOffset, which translates the rendered subject
    // in pure screen-space — independent of FOV, zoom and model scale,
    // unlike nudging world coordinates. ANIMATED per-frame inside animate():
    //   Animation 1 — the face starts centred (hero text overlays the left
    //                 half, exactly like Akash's site) and glides to the
    //                 RIGHT side of the screen, rising toward the upper
    //                 third, while the camera zooms out to reveal him.
    //   Animation 2 — drifts back toward centre/left during the orbit ride.
    // Cleared on smaller viewports where the character stays centred
    // under/behind the mobile text layout.

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
      // FACE: Akash's opening portrait (cap, face and shoulders).  The
      // model has a fixed authored camera composition, so its bounds are
      // deliberately not used to reposition the first scene.
      // upper ~85% (head + PC) that Animation 1 zooms out to. EXIT: full
      // model plus breathing room above the head and below the feet.
      void center;
      void distanceFor;
    };

    // Scrubbed progress values written by ScrollTrigger and consumed by the
    // render loop:
    //   akashProgress  — Animation 1 (Akash's original first animation, hero
    //                    exit): 0 = face close-up, 1 = camera zoomed out to
    //                    the head+PC reveal with the face glided right/up.
    //   scrollProgress — Animation 2 (the orbit ride, kept as-is): runs over
    //                    SelectedWork, 0 = Akash end pose, 1 = fully orbited
    //                    and faded out exactly at Technical Ecosystem.
    let akashProgress = 0;
    let scrollProgress = 0;

    let modelRoot: THREE.Object3D | null = null;
    let headBone: THREE.Object3D | null = null;
    let screenLight: any = null;
    // The reference hero opens on the character's portrait.  The desk is
    // intentionally absent in that first scene and returns as the scroll
    // reveal hands control to the existing animation.
    const deskParts: THREE.Object3D[] = [];
    const deskMaterials = new Map<
      THREE.Material,
      { opacity: number; transparent: boolean; depthWrite: boolean }
    >();
    // The fixed/absolute wrapper rendered around this canvas — used by the
    // render loop to fade the stage out at the end of the scroll ride.
    const stageEl = containerEl.closest(
      ".character-stage"
    ) as HTMLElement | null;
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
      modelRoot = res.scene;
      frameCamera(res.scene);
      headBone = res.scene.getObjectByName("spine006") || null;
      screenLight = res.scene.getObjectByName("screenlight") || null;
      res.scene.traverse((node) => {
        if (
          node.name === "Cube002" ||
          node.name === "screenlight" ||
          node.name === "Keyboard" ||
          node.name === "ground" ||
          node.name === "Plane" ||
          node.name.startsWith("Plane") ||
          node.name.startsWith("KEYS")
        ) {
          deskParts.push(node);
          if (node instanceof THREE.Mesh) {
            const materials = Array.isArray(node.material)
              ? node.material
              : [node.material];
            materials.forEach((material) => {
              if (!deskMaterials.has(material)) {
                deskMaterials.set(material, {
                  opacity: material.opacity,
                  transparent: material.transparent,
                  depthWrite: material.depthWrite,
                });
              }
            });
          }
        }
      });
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
    // Touch handlers live on document: the landing section is now
    // pointer-events: none (so the 3D hover hotspot can receive mouse
    // events), and touch tracking must still work anywhere over the hero.
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);

        // (onResize is defined below alongside the ScrollTrigger setup)

        // Light brush of scroll influence on the model, kept to the hero only.
    // Uses gsap.matchMedia so the trigger is automatically created on desktop
    // and killed when the user resizes below the breakpoint (avoids stale
    // triggers and "jumping" camera on mobile↔desktop transitions).
    const mm = gsap.matchMedia();
    let scrollTween: gsap.core.Tween | null = null;

    mm.add("(min-width: 1025px)", () => {
      // ---- Animation 1: Akash's original first animation, replicated 1:1
      // (github.com/akashrmalhotra/3d-portfolio → utils/GsapScroll.ts
      // setCharTimeline tl1). Plays while the hero scrolls away: the hero
      // text fades out and drops. His 3D tweens (camera z 24.7 → 22 zoom-out
      // framing, character slide to the right side of the screen) are
      // mirrored in the render loop via akashProgress so they compose
      // cleanly with Animation 2 instead of fighting it per-frame.
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#landingDiv",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            akashProgress = self.progress;
          },
        },
      });
      tl1
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0);

      // ---- Animation 2: the orbit ride (unchanged behaviour), now starting
      // exactly where Animation 1 ends (hero fully scrolled past) and still
      // ending when Technical Ecosystem reaches the viewport top.
      // scrub: 0.8 = smooth follow-through without lag, and the onUpdate
      // callback keeps precision 1:1 with actual scroll position.
      const proxy = { p: 0 };
      scrollTween = gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#landingDiv",
          start: "bottom top",
          endTrigger: "#techEcosystem",
          end: "top top",
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
        akashProgress = 0;
      };
    });

    const onResize = () => {
      handleResize(renderer, camera, { current: containerEl });
      // Re-measure all ScrollTriggers for the new layout. The desktop
      // view-offset is re-applied every frame inside animate().
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      // Cap delta so returning from a background tab doesn't produce a
      // giant interpolation jump (a classic cause of "stuck / snapped" pose).
      const delta = Math.min(clock.getDelta(), 0.1);

      // Scroll-stage bookkeeping: fade the canvas out over the final stretch
      // of Animation 2 so it is fully gone exactly when Technical Ecosystem
      // arrives, and only allow the eyebrow-hover hotspot while parked in
      // the hero (before Animation 1 starts).
      const p1 = akashProgress; // Animation 1 — Akash's hero-exit animation
      const p2 = scrollProgress; // Animation 2 — the orbit ride
      // Cross-fade the desk into view while the opening portrait moves away.
      // This replaces the old hard visibility switch, which made the handoff
      // feel like a laggy pop before the established PC animation began.
      const mobileP1 = Math.min(
        1,
        Math.max(0, window.scrollY / Math.max(window.innerHeight * 0.85, 1))
      );
      const transitionP1 = window.innerWidth >= 1025 ? p1 : mobileP1;
      const deskFade =
        p2 > 0
          ? 1
          : THREE.MathUtils.smoothstep(transitionP1, 0.38, 0.78);
      const showDesk = deskFade > 0.001;
      deskParts.forEach((part) => {
        part.visible = showDesk;
      });
      deskMaterials.forEach((original, material) => {
        material.opacity = original.opacity * deskFade;
        material.transparent = original.transparent || deskFade < 0.999;
        material.depthWrite = original.depthWrite && deskFade > 0.94;
        material.needsUpdate = true;
      });
      const fade = p2 < 0.86 ? 1 : Math.max(0, 1 - (p2 - 0.86) / 0.14);
      if (stageEl) {
        stageEl.style.opacity = fade.toFixed(3);
        stageEl.style.visibility = fade <= 0 ? "hidden" : "visible";
        stageEl.classList.toggle("is-hero", p1 < 0.05 && p2 <= 0);
      }

      if (fade > 0) {
        if (headBone) {
          // Refresh-rate independent smoothing: converts the tuned 60 Hz lerp
          // factors into exponential damping, so head tracking feels identical
          // and precise on 60 Hz, 120 Hz or during an FPS dip.
          const dampX = 1 - Math.pow(1 - interpolation.x, delta * 60);
          const dampY = 1 - Math.pow(1 - interpolation.y, delta * 60);
          // The head keeps following the mouse through BOTH animations —
          // tracking eases off only during the final fade-out.
          const influence = p2 < 0.8 ? 1 : Math.max(0, 1 - (p2 - 0.8) / 0.2);
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            dampX,
            dampY,
            THREE.MathUtils.lerp,
            influence
          );
          light.setPointLight(screenLight);
        }

        // Camera rig — two sequenced phases (they join seamlessly):
        //   Animation 1 (Akash's): camera zooms OUT from the face close-up
        //     to the head+PC reveal while the face glides right/up in
        //     screen-space. easeOut so the reveal starts lively and settles.
        //   Animation 2 (ours): from that pose, the camera sweeps ~30°
        //     around the character while pulling back to progressively
        //     reveal the full model. Look-at stays locked the whole time.
        const rFace = CAM_POS_FACE.distanceTo(LOOK_TARGET);
        const rReveal = CAM_POS_REVEAL.distanceTo(LOOK_TARGET);
        const rExit = CAM_POS_EXIT.distanceTo(LOOK_TARGET);
        const p1Ease = 1 - Math.pow(1 - p1, 2);
        const r = THREE.MathUtils.lerp(
          THREE.MathUtils.lerp(rFace, rReveal, p1Ease),
          rExit,
          0.7 * p2
        );
        const a = THREE.MathUtils.degToRad(-30) * p2;
        camera.position.set(
          LOOK_TARGET.x + Math.sin(a) * r,
          LOOK_TARGET.y + r * 0.1 * p2,
          LOOK_TARGET.z + Math.cos(a) * r
        );
        camera.lookAt(LOOK_TARGET);

        // Desktop screen-space choreography: Animation 1 glides the face
        // from centre (hero text overlays the left half) to the RIGHT side
        // of the screen while rising toward the upper third as the camera
        // zooms out — Akash's signature hero exit. Animation 2 drifts the
        // subject back toward centre/left during the orbit.
        const w = containerEl.clientWidth;
        const h = containerEl.clientHeight;
        if (window.innerWidth >= 1025 && w > 0 && h > 0) {
          const xShift = THREE.MathUtils.lerp(
            THREE.MathUtils.lerp(0.1, 0.34, p1Ease),
            -0.08,
            p2
          );
          const yShift = 0.22 * p1Ease * (1 - p2);
          camera.setViewOffset(w, h, -w * xShift, h * yShift, w, h);
        } else if (camera.view) {
          camera.clearViewOffset();
        }
        camera.updateProjectionMatrix();

        // Character turn: Animation 1 turns him 0.7 rad (~40°) exactly like
        // Akash's site; Animation 2 adds a subtle extra turn to meet the
        // orbiting camera.
        if (modelRoot) {
          modelRoot.rotation.y = 0.7 * p1 + THREE.MathUtils.degToRad(12) * p2;
        }

        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
      }
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
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
      scene.clear();
      renderer.dispose();
      if (containerEl.contains(renderer.domElement)) {
        containerEl.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="character-stage">
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
