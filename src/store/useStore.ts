import { create } from "zustand";

export enum FurnitureType {
  Basin = 1,
  BasinTap = 2,
  BasinCounterTop = 3,
  ToiletBowl = 4,
  Ceiling = 5,
  Shower = 6,
  VanityCabinet = 7,
}

export type Furniture = {
  key: string;
  type: FurnitureType;
  path: string;
  dimensions: [number, number, number];
  position: [number, number, number];
  minPackageTier: PackageType;
  textureMap?: Partial<TextureMap>;
  variants?: Record<string, Furniture[]>;
};

export type TextureMap = {
  baseMap: string;
  normalMap: string;
  roughnessMap: string;
  metallicMap: string;
  aoMap: string;
  displacementMap: string;
  map: string; // diffuse map
};

type TextureObject = {
  key: string;
  name: string;
  path?: string;
  maps?: Partial<TextureMap>;
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

  furnitureMap: Partial<Record<FurnitureType, Furniture>>;
  setFurnitureDimensions: (
    type: FurnitureType,
    dimensions: [number, number, number],
  ) => void;
  setFurniturePosition: (
    type: FurnitureType,
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

export const allFurnitures: Furniture[] = [
  // Counter Top
  {
    key: "counter-top-black-600mm",
    type: FurnitureType.BasinCounterTop,
    path: "models/Quartzstone-countertop-lightcolour-600mm.glb",
    dimensions: [0, 0, 0],
    position: [0, 0, 0],
    minPackageTier: "enhanced",
    textureMap: {
      map: "images/maps/black-quartz-600mm-countertop-diffused.webp",
      roughnessMap: "images/maps/black-quartz-600mm-countertop-roughness.webp",
    },
  },
  {
    key: "counter-top-white-600mm",
    type: FurnitureType.BasinCounterTop,
    path: "models/Quartzstone-countertop-lightcolour-600mm.glb",
    dimensions: [0, 0, 0],
    position: [0, 0, 0],
    minPackageTier: "enhanced",
    textureMap: {
      map: "images/maps/white-quartz-600mm-countertop-diffused.webp",
      roughnessMap: "images/maps/white-quartz-600mm-countertop-roughness.webp",
    },
  },
  {
    key: "counter-top-black-800mm",
    type: FurnitureType.BasinCounterTop,
    path: "models/Quartzstone-countertop-lightcolour-800mm.glb",
    dimensions: [0, 0, 0],
    position: [0, 0, 0],
    minPackageTier: "enhanced",
    textureMap: {
      map: "images/maps/black-quartz-800mm-countertop-diffused.webp",
      roughnessMap: "images/maps/black-quartz-800mm-countertop-roughness.webp",
    },
  },
  {
    key: "counter-top-white-800mm",
    type: FurnitureType.BasinCounterTop,
    path: "models/Quartzstone-countertop-lightcolour-800mm.glb",
    dimensions: [0, 0, 0],
    position: [0, 0, 0],
    minPackageTier: "enhanced",
    textureMap: {
      map: "images/maps/white-quartz-800mm-countertop-diffused.webp",
      roughnessMap: "images/maps/white-quartz-800mm-countertop-roughness.webp",
    },
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

  furnitureMap: {
    [FurnitureType.Basin]: {
      key: "basin",
      type: FurnitureType.Basin,
      path: "models/bto-basin-620mm.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
      minPackageTier: "default",
    },
    [FurnitureType.BasinTap]: {
      key: "basin-tap",
      type: FurnitureType.BasinTap,
      path: "models/bto-default-tap.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
      minPackageTier: "default",
    },
    [FurnitureType.ToiletBowl]: {
      key: "toilet-bowl",
      type: FurnitureType.ToiletBowl,
      path: "models/HDB-BTO-toiletbowl.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
      minPackageTier: "default",
    },
    [FurnitureType.Ceiling]: {
      key: "toilet-ceiling",
      type: FurnitureType.Ceiling,
      path: "models/bto-toilet-ceiling-top-section.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
      minPackageTier: "default",
    },
    [FurnitureType.Shower]: {
      key: "shower",
      type: FurnitureType.Shower,
      path: "models/bto-default-showerhead.glb",
      dimensions: [0, 0, 0],
      position: [0, 0, 0],
      minPackageTier: "default",
    },
  },

  setFurnitureDimensions: (type, dimensions) => {
    set((state) => {
      return {
        ...state,
        furnitureMap: {
          ...state.furnitureMap,
          [type]: {
            ...state.furnitureMap[type],
            dimensions,
          },
        },
      };
    });
  },
  setFurniturePosition: (type, position) => {
    set((state) => {
      return {
        ...state,
        furnitureMap: {
          ...state.furnitureMap,
          [type]: {
            ...state.furnitureMap[type],
            position,
          },
        },
      };
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

    const popupKey = get().customizePopUpKey;

    switch (popupKey) {
      case "wallpaper": {
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
        break;
      }

      case "vanitycabinet": {
        const size = selected[0];
        const cabinetVariant = selected[1];
        const counterTopVariant = selected[2];

        const counterTopKey = `counter-top-${counterTopVariant}-${size}mm`;
        const vanityCabinetKey = `vanity-cabinet-${cabinetVariant}${size}`;

        const vanityCabinet = allFurnitures.find(
          (furniture) => furniture.key === vanityCabinetKey,
        );
        if (vanityCabinet) {
          set({
            furnitureMap: {
              ...get().furnitureMap,
              [FurnitureType.VanityCabinet]: vanityCabinet,
            },
          });
        }

        const countertop = allFurnitures.find(
          (furniture) => furniture.key === counterTopKey,
        );
        if (countertop) {
          set({
            furnitureMap: {
              ...get().furnitureMap,
              [FurnitureType.BasinCounterTop]: countertop,
            },
          });
        }

        break;
      }
    }
  },
}));

export default useStore;
