import * as THREE from "three";

export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number,
    interpolationX: number,
    interpolationY: number
  ) => void
) => {
  setTimeout(() => {
    setMousePosition(0, 0, 0.03, 0.03);
    setTimeout(() => {
      setMousePosition(0, 0, 0.15, 0.3);
    }, 1000);
  }, 2000);
};

/**
 * Smooth scroll-influence factor for head tracking.
 * Returns 1 in the hero, easing continuously to 0 as the hero scrolls away —
 * replaces the old binary `scrollY < 200` cutoff which made the head visibly
 * snap to its idle pose the instant the threshold was crossed.
 */
const HEAD_INFLUENCE_RANGE = () =>
  Math.max(window.innerHeight * 0.4, 240);

export const getHeadInfluence = () => {
  const progress = window.scrollY / HEAD_INFLUENCE_RANGE();
  return Math.min(1, Math.max(0, 1 - progress));
};

export const handleHeadRotation = (
  headBone: THREE.Object3D,
  mouseX: number,
  mouseY: number,
  interpolationX: number,
  interpolationY: number,
  lerp: (x: number, y: number, t: number) => number,
  influence = getHeadInfluence()
) => {
  if (!headBone) return;

  const maxRotation = Math.PI / 6;
  let minRotationX = -0.3;
  let maxRotationX = 0.4;
  // Mouse-driven target pitch (same mapping/clamping as the reference).
  let mouseXTargetX: number;
  if (mouseY > minRotationX) {
    mouseXTargetX =
      mouseY < maxRotationX
        ? -mouseY - 0.5 * maxRotation
        : -maxRotation - 0.5 * maxRotation;
  } else {
    mouseXTargetX = -minRotationX - 0.5 * maxRotation;
  }

  // Idle pose used once the hero leaves the viewport.
  const idleX = window.innerWidth > 1024 ? -0.4 : 0;
  const idleY = window.innerWidth > 1024 ? -0.3 : 0;

  // Continuously blend mouse pose ↔ idle pose by `influence`, so the hand-off
  // during scroll is frame-by-frame smooth instead of a threshold jump.
  const targetY = idleY + (mouseX * maxRotation - idleY) * influence;
  const targetX = idleX + (mouseXTargetX - idleX) * influence;

  headBone.rotation.y = lerp(headBone.rotation.y, targetY, interpolationY);
  headBone.rotation.x = lerp(headBone.rotation.x, targetX, interpolationX);
};