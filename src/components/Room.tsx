import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import useStore, { FurnitureType } from "../store/useStore";
import Furniture from "./Furniture";
import BasinTap from "./BasinTap";

const WALL_THICKNESS = 0.75;

type Props = {
  cameraPosition: [number, number, number];
};

const Room = (props: Props) => {
  const roomDimension = useStore((state) => state.roomDimensions);
  const floorTexturePath = useStore((state) => state.floorTexturePath);
  const floorTexture = useLoader(THREE.TextureLoader, floorTexturePath);

  const wallTexturePath = useStore((state) => state.wallTexturePath);
  const wallTexture = useLoader(THREE.TextureLoader, wallTexturePath);

  const ceilingTexturePath = useStore((state) => state.ceilingTexturePath);
  const ceilingTexture = useLoader(THREE.TextureLoader, ceilingTexturePath);

  const visibleWalls = getVisibleWalls(props.cameraPosition);
  const [frontVisible, backVisible, rightVisible, leftVisible] = visibleWalls;
  const walls: {
    position: [number, number, number];
    rotation: [number, number, number];
    dimensions: [number, number, number];
    visible: boolean;
  }[] = [
    {
      position: [
        0,
        roomDimension.height / 2,
        roomDimension.length / 2 + WALL_THICKNESS,
      ],
      rotation: [0, 0, 0],
      dimensions: [roomDimension.depth, roomDimension.height, WALL_THICKNESS],
      visible: frontVisible,
    }, // Front wall
    {
      position: [0, roomDimension.height / 2, -roomDimension.length / 2],
      rotation: [0, 0, 0],
      dimensions: [roomDimension.depth, roomDimension.height, WALL_THICKNESS],
      visible: backVisible,
    }, // Back wall
    {
      position: [
        roomDimension.depth / 2 + WALL_THICKNESS / 2,
        roomDimension.height / 2,
        WALL_THICKNESS / 2,
      ],
      rotation: [0, Math.PI / 2, 0],
      dimensions: [roomDimension.length, roomDimension.height, WALL_THICKNESS],
      visible: rightVisible,
    }, // Right wall
    {
      position: [
        -roomDimension.depth / 2 - WALL_THICKNESS / 2,
        roomDimension.height / 2,
        WALL_THICKNESS / 2,
      ],
      rotation: [0, Math.PI / 2, 0],
      dimensions: [roomDimension.length, roomDimension.height, WALL_THICKNESS],
      visible: leftVisible,
    }, // Left wall
  ];

  const allFurnitures = useStore((state) => state.furnitures);

  return (
    <group>
      {walls.map((wall, index) => (
        <mesh key={index} position={wall.position} rotation={wall.rotation}>
          <boxGeometry args={wall.dimensions} />
          <meshStandardMaterial map={wallTexture} visible={wall.visible} />
        </mesh>
      ))}
      <mesh
        position={[0, 0, WALL_THICKNESS / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[roomDimension.depth, roomDimension.length]} />
        <meshStandardMaterial map={floorTexture} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position={[0, roomDimension.height, WALL_THICKNESS / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[roomDimension.depth, roomDimension.length]} />
        <meshStandardMaterial map={ceilingTexture} side={THREE.DoubleSide} />
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
                scale={[8, 8, 8]}
              />
            );
          case FurnitureType.BasinTap:
            return (
              <BasinTap
                key={furniture.key}
                path={furniture.path}
                scale={[8, 8, 8]}
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
                    roomDimension.length / 4 - dimensions[0] / 2,
                    dimensions[0] / 2,
                    walls[1].position[2] +
                      dimensions[2] / 2 +
                      WALL_THICKNESS / 2,
                  ];
                }}
                scale={[8, 8, 8]}
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
                    roomDimension.height / 2 - dimensions[1] / 2,
                    -roomDimension.depth / 4 + dimensions[2] / 2,
                  ];
                }}
                scale={[8, 8, 8]}
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
                    walls[2].position[0] -
                      dimensions[0] / 2 -
                      WALL_THICKNESS / 2,
                    roomDimension.height - dimensions[1] - 0.03,
                    walls[1].position[2] +
                      dimensions[2] / 2 +
                      WALL_THICKNESS / 2 +
                      0.03,
                  ];
                }}
                scale={[10, 10, 10]}
                rotation={[0, 0, 0]}
              />
            );
          default:
            return <primitive key={index} object={furniture} />;
        }
      })}
    </group>
  );
};

const getVisibleWalls = (cameraPosition: [number, number, number]) => {
  const [x, , z] = cameraPosition;
  const angle = Math.atan2(x, z);

  const result = [true, true, true, true]; // All walls visible

  if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
    result[0] = false; // Front wall invisible
  } else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) {
    result[2] = false; // Right wall invisible
  } else if (angle >= -(3 * Math.PI) / 4 && angle < -Math.PI / 4) {
    result[3] = false; // Left wall invisible
  } else {
    result[1] = false; // Back wall invisible
  }

  return result;
};

export default Room;
