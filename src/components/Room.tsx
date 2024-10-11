import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import useStore from "../store/useStore";

const WALL_THICKNESS = 0.2;
const WALL_HEIGHT = 10;
const ROOM_LENGTH = 17;
const ROOM_WIDTH = 18;

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
      dimensions: [ROOM_WIDTH, WALL_HEIGHT, WALL_THICKNESS],
      visible: frontVisible,
    }, // Front wall
    {
      position: [0, WALL_HEIGHT / 2, -ROOM_LENGTH / 2],
      rotation: [0, 0, 0],
      dimensions: [ROOM_WIDTH, WALL_HEIGHT, WALL_THICKNESS],
      visible: backVisible,
    }, // Back wall
    {
      position: [ROOM_WIDTH / 2, WALL_HEIGHT / 2, 0],
      rotation: [0, Math.PI / 2, 0],
      dimensions: [ROOM_LENGTH, WALL_HEIGHT, WALL_THICKNESS],
      visible: rightVisible,
    }, // Right wall
    {
      position: [-ROOM_WIDTH / 2, WALL_HEIGHT / 2, 0],
      rotation: [0, Math.PI / 2, 0],
      dimensions: [ROOM_LENGTH, WALL_HEIGHT, WALL_THICKNESS],
      visible: leftVisible,
    }, // Left wall
  ];

  return (
    <group>
      {walls.map((wall, index) => (
        <mesh key={index} position={wall.position} rotation={wall.rotation}>
          <boxGeometry args={wall.dimensions} />
          <meshStandardMaterial map={wallTexture} visible={wall.visible} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM_LENGTH + 1, ROOM_WIDTH - 1]} />
        <meshStandardMaterial map={floorTexture} side={THREE.DoubleSide} />
      </mesh>
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
