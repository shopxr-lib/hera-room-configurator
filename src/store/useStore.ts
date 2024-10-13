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

type TextureMap = {
  baseMap: string;
  normalMap: string;
  roughnessMap: string;
  metallicMap: string;
  aoMap: string;
  displacementMap: string;
};

type TextureObject = {
  key: string;
  name: string;
  path?: string;
  maps?: TextureMap;
  baseColor?: string;
};

type TextureObjectType = "floor" | "wall" | "ceiling";

type PackageType = "default" | "enhanced" | "premium" | "luxury";

type StoreState = {
  package: PackageType | "";
  setPackage: (p: string) => void;
  roomDimensions: {
    depth: number;
    length: number;
    height: number;
  };
  textures: { [key in TextureObjectType]: TextureObject };

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

export const allFloorsTextures: TextureObject[] = [
  {
    key: "base-color",
    name: "Base Color",
    maps: {
      normalMap: "images/wallpaper/bto-floorTile-Normal.webp",
      roughnessMap: "images/wallpaper/bto-floorTile-Roughness.webp",
      metallicMap: "images/wallpaper/bto-floorTile-Metallic.webp",
      aoMap: "images/wallpaper/bto-floorTile-AmbientOcclusion.webp",
      displacementMap: "images/wallpaper/bto-floorTile-Displacement.webp",
      baseMap: "images/wallpaper/bto-floorTile-BaseColor.webp",
    },
    baseColor: "#30312f",
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
  depth: 1.7,
  height: 2.0,
  length: 1.8,
};

const useStore = create<StoreState>((set, get) => ({
  roomDimensions,
  package: "",
  setPackage: (p: string) => set({ package: p as PackageType }),
  textures: {
    floor: allFloorsTextures[0],
    wall: allWallTextures[0],
    ceiling: allCeilingTextures[0],
  },

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

        set({
          textures: {
            ...get().textures,
            wall: texture,
          },
        });
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

        set({
          textures: {
            ...get().textures,
            ceiling: texture,
          },
        });

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

        set({
          textures: {
            ...get().textures,
            floor: texture,
          },
        });
      }
    }
  },
}));

export default useStore;
