import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import useStore, { FurnitureType } from "../store/useStore";
import Furniture from "./Furniture";
import BasinTap from "./BasinTap";

const WALL_THICKNESS = 0.2;
const WALL_HEIGHT = 10;
const ROOM_LENGTH = 17;
const ROOM_DEPTH = 18;

type Props = {
  cameraPosition: [number, number, number];
};

const Room = (props: Props) => {
  const floorTexturePath = useStore((state) => state.floorTexturePath);
  const floorTexture = useLoader(THREE.TextureLoader, floorTexturePath);

  const wallTexturePath = useStore((state) => state.wallTexturePath);
  const wallTexture = useLoader(THREE.TextureLoader, wallTexturePath);

  const visibleWalls = getVisibleWalls(props.cameraPosition);
  const [frontVisible, backVisible, rightVisible, leftVisible] = visibleWalls;
  const walls: {
    position: [number, number, number];
    rotation: [number, number, number];
    dimensions: [number, number, number];
    visible: boolean;
  }[] = [
    {
      position: [0, WALL_HEIGHT / 2, ROOM_LENGTH / 2],
      rotation: [0, 0, 0],
      dimensions: [ROOM_DEPTH, WALL_HEIGHT, WALL_THICKNESS],
      visible: frontVisible,
    }, // Front wall
    {
      position: [0, WALL_HEIGHT / 2, -ROOM_LENGTH / 2],
      rotation: [0, 0, 0],
      dimensions: [ROOM_DEPTH, WALL_HEIGHT, WALL_THICKNESS],
      visible: backVisible,
    }, // Back wall
    {
      position: [ROOM_DEPTH / 2, WALL_HEIGHT / 2, 0],
      rotation: [0, Math.PI / 2, 0],
      dimensions: [ROOM_LENGTH, WALL_HEIGHT, WALL_THICKNESS],
      visible: rightVisible,
    }, // Right wall
    {
      position: [-ROOM_DEPTH / 2, WALL_HEIGHT / 2, 0],
      rotation: [0, Math.PI / 2, 0],
      dimensions: [ROOM_LENGTH, WALL_HEIGHT, WALL_THICKNESS],
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
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM_DEPTH, ROOM_LENGTH]} />
        <meshStandardMaterial map={floorTexture} side={THREE.DoubleSide} />
      </mesh>
      {allFurnitures.map((furniture, index) => {
        if (furniture.type === FurnitureType.Basin) {
          return (
            <Furniture
              key={furniture.key}
              furnitureKey={furniture.key}
              path={furniture.path}
              derivePosition={(dimensions) => {
                return [
                  -ROOM_DEPTH / 2 + dimensions[0] / 2,
                  WALL_HEIGHT / 2,
                  -ROOM_DEPTH / 4,
                ];
              }}
              scale={[8, 8, 8]}
            />
          );
        } else if (furniture.type === FurnitureType.BasinTap) {
          return (
            <BasinTap
              key={furniture.key}
              path={furniture.path}
              scale={[8, 8, 8]}
              rotation={[0, Math.PI / 2, 0]}
            />
          );
        } else if (furniture.type === FurnitureType.ToiletBowl) {
          return (
            <Furniture
              key={furniture.key}
              furnitureKey={furniture.key}
              path={furniture.path}
              derivePosition={(dimensions) => {
                return [
                  ROOM_LENGTH / 4 - dimensions[0] / 2,
                  dimensions[0] / 2,
                  -ROOM_DEPTH / 2 + dimensions[1] / 2,
                ];
              }}
              scale={[8, 8, 8]}
              rotation={[0, -Math.PI / 2, 0]}
            />
          );
        }

        return <primitive key={index} object={furniture} />;
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
