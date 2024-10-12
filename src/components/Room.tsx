import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import useStore, { FurnitureType } from "../store/useStore";
import Furniture from "./Furniture";
import BasinTap from "./BasinTap";
import { type WallInfo } from "./types";
import { WALL_THICKNESS } from "./constants";
import Wall from "./Wall";
import Floor from "./Floor";
import { Suspense } from "react";

const Room = () => {
  const roomDimension = useStore((state) => state.roomDimensions);

  const wallTextureObject = useStore((state) => state.textures.wall);
  const wallTexture = useLoader(THREE.TextureLoader, wallTextureObject.path!);

  const ceilingTextureObject = useStore((state) => state.textures.ceiling);
  const ceilingTexture = useLoader(
    THREE.TextureLoader,
    ceilingTextureObject.path!,
  );

  const walls: WallInfo[] = [
    {
      position: [
        0,
        roomDimension.height / 2,
        roomDimension.length / 2 + WALL_THICKNESS,
      ],
      rotation: [0, 0, 0],
      dimensions: [roomDimension.depth, roomDimension.height, WALL_THICKNESS],
    }, // Front wall
    {
      position: [0, roomDimension.height / 2, -roomDimension.length / 2],
      rotation: [0, 0, 0],
      dimensions: [roomDimension.depth, roomDimension.height, WALL_THICKNESS],
    }, // Back wall
    {
      position: [
        roomDimension.depth / 2 + WALL_THICKNESS / 2,
        roomDimension.height / 2,
        WALL_THICKNESS / 2,
      ],
      rotation: [0, Math.PI / 2, 0],
      dimensions: [roomDimension.length, roomDimension.height, WALL_THICKNESS],
    }, // Right wall
    {
      position: [
        -roomDimension.depth / 2 - WALL_THICKNESS / 2,
        roomDimension.height / 2,
        WALL_THICKNESS / 2,
      ],
      rotation: [0, Math.PI / 2, 0],
      dimensions: [roomDimension.length, roomDimension.height, WALL_THICKNESS],
    }, // Left wall
  ];

  const allFurnitures = useStore((state) => state.furnitures);

  return (
    <group>
      {walls.map((wall, index) => (
        <Wall key={index} wall={wall} texture={wallTexture} side={index} />
      ))}
      <Suspense fallback={null}>
        <Floor />
      </Suspense>
      <mesh
        position={[0, roomDimension.height, WALL_THICKNESS / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[roomDimension.depth, roomDimension.length]} />
        <meshStandardMaterial map={ceilingTexture} side={THREE.BackSide} />
      </mesh>
      {allFurnitures.map((furniture, index) => {
        switch (furniture.type) {
          case FurnitureType.Basin:
            return (
              <Furniture
                key={furniture.key}
                furnitureKey={furniture.key}
                path={furniture.path}
                derivePosition={(dimensions) => {
                  return [
                    walls[3].position[0] + dimensions[0] / 2,
                    roomDimension.height / 3,
                    roomDimension.depth / 4,
                  ];
                }}
              />
            );
          case FurnitureType.BasinTap:
            return (
              <BasinTap
                key={furniture.key}
                path={furniture.path}
                rotation={[0, Math.PI / 2, 0]}
              />
            );
          case FurnitureType.ToiletBowl:
            return (
              <Furniture
                key={furniture.key}
                furnitureKey={furniture.key}
                path={furniture.path}
                derivePosition={(dimensions) => {
                  return [
                    roomDimension.length / 2.5 - dimensions[0] / 2,
                    dimensions[0] / 2,
                    walls[1].position[2] + dimensions[2] / 2 + WALL_THICKNESS,
                  ];
                }}
                rotation={[0, -Math.PI / 2, 0]}
              />
            );
          case FurnitureType.Shower:
            return (
              <Furniture
                key={furniture.key}
                furnitureKey={furniture.key}
                path={furniture.path}
                derivePosition={(dimensions) => {
                  return [
                    walls[3].position[0] + dimensions[0] / 2,
                    roomDimension.height / 2 - dimensions[1] / 2 - 0.2,
                    -roomDimension.depth / 2.5 + dimensions[2] / 2,
                  ];
                }}
                rotation={[0, Math.PI / 2, 0]}
              />
            );
          case FurnitureType.Ceiling:
            return (
              <Furniture
                key={furniture.key}
                furnitureKey={furniture.key}
                path={furniture.path}
                derivePosition={(dimensions) => {
                  return [
                    0,
                    roomDimension.height - dimensions[1],
                    WALL_THICKNESS / 2,
                  ];
                }}
                scale={[-1, 1, 1]}
              />
            );
          default:
            return <primitive key={index} object={furniture} />;
        }
      })}
    </group>
  );
};

export default Room;
