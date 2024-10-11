import { Canvas as ThreeCanvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Room from "./Room";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

const Canvas: React.FC = () => {
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 10, 25]);

  return (
    <ThreeCanvas
      shadows={{
        enabled: true,
        type: THREE.PCFSoftShadowMap,
      }}
      gl={{
        localClippingEnabled: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      camera={{
        position: cameraPosition, // Adjusted camera position to center the room
        fov: 45,
        near: 0.001,
        far: 1000,
      }}
    >
      <color attach="background" args={["#C7C3C6"]} />

      {/* common setting that looks nice enough */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <Room cameraPosition={cameraPosition} />
      <CameraTracker setCameraPosition={setCameraPosition} />
      <OrbitControls target={[0, 5, 0]} />
    </ThreeCanvas>
  );
};

const CameraTracker: React.FC<{
  setCameraPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
}> = ({ setCameraPosition }) => {
  useFrame(({ camera }) => {
    setCameraPosition([
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ]);
  });
  return null;
};

export default Canvas;
