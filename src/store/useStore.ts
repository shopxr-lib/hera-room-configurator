import { create } from "zustand";

type StoreState = {
  floorTexturePath: string;
  setFloorTexturePath: (path: string) => void;

  wallTexturePath: string;
  setWallTexturePath: (path: string) => void;
};

export const allFloorsTextures = [
  {
    key: "ambient-occlussion",
    name: "Ambient Occlussion",
    path: "/src/assets/images/wallpaper/bto-floorTile-AmbientOcclusion.webp",
  },
  {
    key: "base-color",
    name: "Base Color",
    path: "/src/assets/images/wallpaper/bto-floorTile-BaseColor.webp",
  },
  {
    key: "displacement",
    name: "Displacement",
    path: "/src/assets/images/wallpaper/bto-floorTile-Displacement.webp",
  },
  {
    key: "metallic",
    name: "Metallic",
    path: "/src/assets/images/wallpaper/bto-floorTile-Metallic.webp",
  },
  {
    key: "normal",
    name: "Normal",
    path: "/src/assets/images/wallpaper/bto-floorTile-Normal.webp",
  },
  {
    key: "roughness",
    name: "Roughness",
    path: "/src/assets/images/wallpaper/bto-floorTile-Roughness.webp",
  },
];

export const allWallTextures = [
  {
    key: "marble",
    name: "Marble",
    path: "/src/assets/images/wallpaper/marble-wall.webp",
  },
];

const useStore = create<StoreState>((set) => ({
  floorTexturePath: allFloorsTextures[0].path,
  setFloorTexturePath: (path) => set({ floorTexturePath: path }),

  wallTexturePath: allWallTextures[0].path,
  setWallTexturePath: (path) => set({ wallTexturePath: path }),
}));

export default useStore;
