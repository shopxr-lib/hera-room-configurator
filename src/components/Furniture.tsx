import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

import * as THREE from "three";
import useStore from "../store/useStore";

interface Props {
  furnitureKey: string;
  path: string;
  scale?: [number, number, number];
  rotation?: [number, number, number];

  derivePosition: (
    dimension: [number, number, number]
  ) => [number, number, number];
}

const Furniture: React.FC<Props> = ({
  furnitureKey,
  path,
  derivePosition,
  ...props
}) => {
  const model = useGLTF(path);
  const ref = useRef<THREE.Group>(null);

  const [dimensions, setDimensions] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
  const setFurnitureDimensions = useStore(
    (state) => state.setFurnitureDimensions
  );
  const setFurniturePosition = useStore((state) => state.setFurniturePosition);

  useEffect(() => {
    if (ref.current) {
      const box = new THREE.Box3().setFromObject(ref.current);
      const size = new THREE.Vector3();
      box.getSize(size);
      setDimensions([size.x, size.y, size.z]);
      setFurnitureDimensions(furnitureKey, [size.x, size.y, size.z]);
    }
  }, [model.scene, setDimensions, setFurnitureDimensions, furnitureKey]);

  const position = derivePosition(dimensions);

  useEffect(() => {
    setFurniturePosition(furnitureKey, position);
  }, []);

  return (
    <primitive ref={ref} object={model.scene} position={position} {...props} />
  );
};

export default Furniture;
