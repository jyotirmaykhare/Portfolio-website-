import * as THREE from "three";
import type { RefObject } from "react";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: RefObject<HTMLDivElement | null>
) {
  if (!canvasDiv.current) return;
  const canvas = canvasDiv.current.getBoundingClientRect();
  const width = canvas.width;
  const height = canvas.height;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}