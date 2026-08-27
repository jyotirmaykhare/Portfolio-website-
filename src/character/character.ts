import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

interface LoadedCharacter {
  scene: THREE.Object3D;
  gltf: GLTF;
}

/**
 * Fetches the encrypted character model, decrypts it in the browser,
 * and loads it (with Draco) into a usable THREE scene. Faithful to the
 * akashmalhotra 3D portfolio so the exact character + baked animations are kept.
 */
const loadEncryptedCharacter = () => {
  return new Promise<LoadedCharacter | null>(async (resolve, reject) => {
    try {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");
      loader.setDRACOLoader(dracoLoader);

      const encryptedBlob = await decryptFile(
        "/models/character.enc",
        "MyCharacter12"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      loader.load(
        blobUrl,
        (gltf) => {
          const character = gltf.scene;
          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              if (mesh.material) {
                if (mesh.name === "BODY.SHIRT") {
                  const newMat = (
                    mesh.material as THREE.Material
                  ).clone() as THREE.MeshStandardMaterial;
                  newMat.color = new THREE.Color("#5eead4");
                  mesh.material = newMat;
                } else if (mesh.name === "Pant") {
                  const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                  mat.color = new THREE.Color("#000000");
                  mesh.material = mat;
                }
              }
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });
          dracoLoader.dispose();
          URL.revokeObjectURL(blobUrl);
          resolve({ scene: character, gltf });
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

export default loadEncryptedCharacter;