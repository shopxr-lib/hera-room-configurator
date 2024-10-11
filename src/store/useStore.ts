import { create } from "zustand";

export enum FurnitureType {
  Basin = 1,
  BasinTap = 2,
  ToiletBowl = 3,
  Ceiling = 4,
  Shower = 5,
}

export type Furniture = {
  key: string;
  type: FurnitureType;
  path: string;
  dimensions: [number, number, number];
  position: [number, number, number];
};

type StoreState = {
  roomDimensions: {
    depth: number;
    length: number;
    height: number;
  };
  floorTexturePath: string;
  setFloorTexturePath: (path: string) => void;

  wallTexturePath: string;
  setWallTexturePath: (path: string) => void;

  furnitures: Furniture[];
  addFurniture: (furniture: Furniture) => void;
  setFurnitureDimensions: (
    key: string,
    dimensions: [number, number, number]
  ) => void;
  setFurniturePosition: (
    key: string,
    position: [number, number, number]
  ) => void;
};

export const allFloorsTextures = [
  {
    key: "base-color",
    name: "Base Color",
    path: "/src/assets/images/wallpaper/bto-floorTile-BaseColor.webp",
  },
  {
    key: "ambient-occlussion",
    name: "Ambient Occlussion",
    path: "/src/assets/images/wallpaper/bto-floorTile-AmbientOcclusion.webp",
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

const roomDimensions = {
  depth: 17,
  height: 15,
  length: 18,
};

const useStore = create<StoreState>((set) => ({
  roomDimensions,
  floorTexturePath: allFloorsTextures[0].path,
  setFloorTexturePath: (path) => set({ floorTexturePath: path }),

  wallTexturePath: allWallTextures[0].path,
  setWallTexturePath: (path) => set({ wallTexturePath: path }),

  furnitures: [
    {
      key: "basin",
      type: FurnitureType.Basin,
      path: "/src/assets/models/bto-basin-620mm.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
    },
    {
      key: "basin-tap",
      type: FurnitureType.BasinTap,
      path: "/src/assets/models/bto-default-tap.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
    },
    {
      key: "toilet-bowl",
      type: FurnitureType.ToiletBowl,
      path: "/src/assets/models/HDB-BTO-toiletbowl.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
    },
    {
      key: "toilet-ceiling",
      type: FurnitureType.Ceiling,
      path: "/src/assets/models/bto-toilet-ceiling-top-section.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
    },
  ],
  addFurniture: (furniture) =>
    set((state) => ({ furnitures: [...state.furnitures, furniture] })),

  setFurnitureDimensions: (key, dimensions) => {
    set((state) => {
      const furnitures = state.furnitures.map((furniture) => {
        if (furniture.key === key) {
          return { ...furniture, dimensions };
        }
        return furniture;
      });

      return { furnitures };
    });
  },
  setFurniturePosition(key, position) {
    set((state) => {
      const furnitures = state.furnitures.map((furniture) => {
        if (furniture.key === key) {
          return { ...furniture, position };
        }
        return furniture;
      });

      return { furnitures };
    });
  },
}));

export default useStore;
