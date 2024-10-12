import React from "react";
import { WALL_THICKNESS } from "./constants";
import useStore from "../store/useStore";
import { useTexture } from "@react-three/drei";

const Floor: React.FC = () => {
  const roomDimension = useStore((state) => state.roomDimensions);

  const texturePath = useStore((state) => state.floorTexturePath);
  const texture = useTexture(texturePath);

  return (
    <mesh position={[0, 0, WALL_THICKNESS / 2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[roomDimension.depth, roomDimension.length]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Floor;
