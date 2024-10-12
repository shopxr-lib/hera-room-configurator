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

  ceilingTexturePath: string;
  setCeilingTexturePath: (path: string) => void;

  furnitures: Furniture[];
  addFurniture: (furniture: Furniture) => void;
  setFurnitureDimensions: (
    key: string,
    dimensions: [number, number, number],
  ) => void;
  setFurniturePosition: (
    key: string,
    position: [number, number, number],
  ) => void;

  customizePopUpKey: string;
  customizeSelected: string[];
  setCustomizePopUpKey: (key: string) => void;
  clearCustomizeSelected: () => void;
  addCustomizeSelected: (key: string, level: number) => void;
  commitCustomizeSelected: () => void;
};

export const allFloorsTextures = [
  {
    key: "base-color",
    name: "Base Color",
    path: "images/wallpaper/bto-floorTile-BaseColor.webp",
  },
  {
    key: "ambient-occlusion",
    name: "Ambient Occlussion",
    path: "images/wallpaper/bto-floorTile-AmbientOcclusion.webp",
  },
  {
    key: "displacement",
    name: "Displacement",
    path: "images/wallpaper/bto-floorTile-Displacement.webp",
  },
  {
    key: "metallic",
    name: "Metallic",
    path: "images/wallpaper/bto-floorTile-Metallic.webp",
  },
  {
    key: "normal",
    name: "Normal",
    path: "images/wallpaper/bto-floorTile-Normal.webp",
  },
  {
    key: "roughness",
    name: "Roughness",
    path: "images/wallpaper/bto-floorTile-Roughness.webp",
  },
];

export const allWallTextures = [
  {
    key: "marble",
    name: "Marble",
    path: "images/wallpaper/marble-wall.webp",
  },
];

export const allCeilingTextures = [
  {
    key: "ceiling",
    name: "Default",
    path: "images/wallpaper/bto-ceiling-texture.webp",
  },
];

const roomDimensions = {
  depth: 17,
  height: 20,
  length: 18,
};

const useStore = create<StoreState>((set, get) => ({
  roomDimensions,
  floorTexturePath: allFloorsTextures[0].path,
  setFloorTexturePath: (path) => set({ floorTexturePath: path }),

  wallTexturePath: allWallTextures[0].path,
  setWallTexturePath: (path) => set({ wallTexturePath: path }),

  ceilingTexturePath: allCeilingTextures[0].path,
  setCeilingTexturePath: (path) => set({ ceilingTexturePath: path }),

  furnitures: [
    {
      key: "basin",
      type: FurnitureType.Basin,
      path: "models/bto-basin-620mm.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
    },
    {
      key: "basin-tap",
      type: FurnitureType.BasinTap,
      path: "models/bto-default-tap.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
    },
    {
      key: "toilet-bowl",
      type: FurnitureType.ToiletBowl,
      path: "models/HDB-BTO-toiletbowl.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
    },
    {
      key: "toilet-ceiling",
      type: FurnitureType.Ceiling,
      path: "models/bto-toilet-ceiling-top-section.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
    },
    {
      key: "shower",
      type: FurnitureType.Shower,
      path: "models/bto-default-showerhead.glb",
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

  customizePopUpKey: "",
  customizeSelected: [],
  setCustomizePopUpKey: (key) => set({ customizePopUpKey: key }),
  clearCustomizeSelected: () => set({ customizeSelected: [] }),
  addCustomizeSelected: (key, level) => {
    const current = get().customizeSelected;
    if (level < 0) {
      return;
    }

    const cappedLevel = Math.min(level, current.length);

    if (cappedLevel === current.length) {
      set({ customizeSelected: [...current, key] });
      return;
    }

    const newSelected = [...current];
    newSelected[cappedLevel] = key;
    set({ customizeSelected: newSelected });
  },
  commitCustomizeSelected: () => {
    const selected = get().customizeSelected;
    if (selected.length <= 0) {
      return;
    }

    switch (selected[0]) {
      case "wall": {
        if (selected.length <= 1) {
          return;
        }
        const texture = allWallTextures.find(
          (texture) => texture.key === selected[1],
        );
        if (!texture) {
          return;
        }

        set({ wallTexturePath: texture.path });
        break;
      }
      case "ceiling": {
        if (selected.length <= 1) {
          return;
        }
        const texture = allCeilingTextures.find(
          (texture) => texture.key === selected[1],
        );
        if (!texture) {
          return;
        }

        set({ ceilingTexturePath: texture.path });
        break;
      }

      case "floor": {
        if (selected.length <= 1) {
          return;
        }
        const texture = allFloorsTextures.find(
          (texture) => texture.key === selected[1],
        );
        if (!texture) {
          return;
        }

        set({ floorTexturePath: texture.path });
      }
    }
  },
}));

export default useStore;
