import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import useStore, { FurnitureType, TextureMap } from "../store/useStore";
import { useEffect, useRef, useState } from "react";

interface Props {
  path: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];
  textureMap?: Partial<TextureMap>;
}
const VanityCabinet = ({ path, textureMap, ...props }: Props) => {
  const { scene } = useGLTF(path);
  const texture = useTexture(textureMap!, (t) => {
    Object.values(t).forEach((texture) => {
      texture.flipY = false;
    });
  });

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.material.map = texture.map;
        object.material.needsUpdate = true;
      }
    });
  }, [scene, texture]);

  const ref = useRef<THREE.Group>(null);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  const furnitureMap = useStore((state) => state.furnitureMap);
  const basinFurniture = furnitureMap[FurnitureType.Basin];

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!basinFurniture) {
      return;
    }

    const box = new THREE.Box3().setFromObject(ref.current);
    const size = new THREE.Vector3();
    box.getSize(size);
    setPosition([
      basinFurniture.position[0] + 0.01,
      basinFurniture.position[1] - size.y - 0.08,
      basinFurniture.position[2],
    ]);
  }, [setPosition, basinFurniture]);

  return (
    <primitive
      ref={ref}
      object={scene}
      position={position}
      {...props}
      {...texture}
    />
  );
};

export default VanityCabinet;
