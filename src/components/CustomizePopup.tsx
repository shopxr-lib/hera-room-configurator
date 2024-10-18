import React from "react";
import clsx from "clsx";
import useStore from "../store/useStore";
import { IconX } from "@tabler/icons-react";
import { Button } from "@mantine/core";

type Props = object;

const CustomizePopUp: React.FC<Props> = () => {
  const customizePopUpKey = useStore((state) => state.customizePopUpKey);
  const setCustomizePopUpKey = useStore((state) => state.setCustomizePopUpKey);
  const customizeSelected = useStore((state) => state.customizeSelected);
  const clearCustomizeSelected = useStore(
    (state) => state.clearCustomizeSelected,
  );

  const addCustomizeSelected = useStore((state) => state.addCustomizeSelected);
  const commitCustomizeSelected = useStore(
    (state) => state.commitCustomizeSelected,
  );

  const popUpInfo = PopUpInfos[customizePopUpKey];
  if (!popUpInfo) {
    return null;
  }

  return (
    <div className="fixed h-[500px] w-[90%] overflow-y-scroll rounded-lg bg-white p-8 sm:left-8 sm:w-[400px]">
      <div className="prose flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="m-0">{popUpInfo.title}</h1>
          <IconX
            cursor="pointer"
            onClick={() => {
              setCustomizePopUpKey("");
              clearCustomizeSelected();
            }}
          />
        </div>
        <p>{popUpInfo.subtitle}</p>
        {popUpInfo.l1.map((l1) => (
          <div key={l1.title}>
            <h2 className="mt-0">{l1.title}</h2>
            <div className="grid grid-cols-3 gap-4">
              {l1.choices.map((choice) => {
                const isSelected = customizeSelected[0] === choice.key;
                return (
                  <button
                    key={choice.key}
                    className={clsx("rounded-md border-4 p-1", {
                      "border-brand": isSelected,
                      "border-transparent hover:border-gray-100": !isSelected,
                    })}
                    onClick={() => addCustomizeSelected(choice.key, 0)}
                  >
                    {choice.image ? (
                      <img
                        className="m-0"
                        src={choice.image}
                        alt={choice.title}
                      />
                    ) : (
                      choice.title
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {customizeSelected.length > 0 &&
          customizeSelected[0] in popUpInfo.l2 && (
            <div>
              <h2 className="mt-0">
                {popUpInfo.l2[customizeSelected[0]].title}
              </h2>
              <div className="grid grid-cols-3 items-center justify-items-center gap-4">
                {popUpInfo.l2[customizeSelected[0]].choices.map((choice) => {
                  const selected = customizeSelected[1] === choice.productKey;
                  return (
                    <button
                      key={choice.key}
                      className={clsx("rounded-md border-4", {
                        "border-brand": selected,
                        "border-transparent hover:border-gray-300": !selected,
                      })}
                      onClick={() => {
                        addCustomizeSelected(choice.productKey, 1);
                      }}
                    >
                      {choice.image ? (
                        <img
                          className="m-0 h-full w-full"
                          src={choice.image}
                          alt={choice.title}
                        />
                      ) : (
                        choice.title
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        {popUpInfo.l3 && customizeSelected[0] in popUpInfo.l3 && (
          <div>
            <h2 className="mt-0">{popUpInfo.l3[customizeSelected[0]].title}</h2>
            <div className="grid grid-cols-3 items-center justify-items-center gap-4">
              {popUpInfo.l3[customizeSelected[0]].choices.map((choice) => {
                const selected = customizeSelected[2] === choice.productKey;
                return (
                  <button
                    key={choice.key}
                    className={clsx("rounded-md border-4 p-2", {
                      "border-brand": selected,
                      "border-transparent hover:border-gray-300": !selected,
                    })}
                    onClick={() => {
                      addCustomizeSelected(choice.productKey, 2);
                    }}
                  >
                    {choice.image ? (
                      <img
                        className="m-0 h-full w-full"
                        src={choice.image}
                        alt={choice.title}
                      />
                    ) : (
                      choice.title
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <Button onClick={() => commitCustomizeSelected()}>Add Furniture</Button>
      </div>
    </div>
  );
};

const PopUpInfos: Record<string, PopUpInfo> = {
  wallpaper: {
    title: "Wallpaper",
    subtitle: "Choose a wallpaper for your bathroom",
    l1: [
      {
        title: "Surface",
        choices: [
          {
            key: "wall",
            title: "Wall",
          },
          {
            key: "ceiling",
            title: "Ceiling",
          },
          {
            key: "floor",
            title: "Floor",
          },
        ],
      },
    ],
    l2: {
      ceiling: {
        parent: "ceiling",
        title: "Ceiling",
        choices: [
          {
            key: "default",
            title: "Default",
            image: "images/wallpaper/bto-ceiling-texture.webp",
            productKey: "default",
          },
        ],
      },
      wall: {
        parent: "wall",
        title: "Wall",
        choices: [
          {
            key: "marble",
            productKey: "marble",
            title: "Marble",
            image: "images/wallpaper/marble-wall.webp",
          },
        ],
      },
      floor: {
        parent: "floor",
        title: "Floor",
        choices: [
          {
            key: "base-color",
            productKey: "base-color",
            title: "Base Color",
            image: "images/wallpaper/bto-floorTile-BaseColor.webp",
          },
        ],
      },
    },
  },
  vanitycabinet: {
    title: "Vanity Cabinet Set",
    subtitle:
      "Mix & Match your very own vanity cabinet set & add it into the scene.",
    l1: [
      {
        title: "Sizes",
        choices: [
          {
            key: "600",
            title: "600mm",
          },
          {
            key: "800",
            title: "800mm",
          },
        ],
      },
    ],
    l2: {
      "600": {
        parent: "600",
        title: "Vanity Cabinet Color",
        choices: [
          {
            key: "vanity-birch-600mm",
            productKey: "birch",
            title: "Birch",
            image: "images/vanity-cabinet/birch-600mm.webp",
          },
          {
            key: "vanity-blanco-600mm",
            productKey: "blanco",
            title: "Blanco",
            image: "images/vanity-cabinet/blanco-600mm.webp",
          },
          {
            key: "vanity-brownstone-600mm",
            productKey: "brown-stone",
            title: "Brownstone",
            image: "images/vanity-cabinet/brownstone-600mm.webp",
          },
          {
            key: "vanity-charcoal-ash-600mm",
            productKey: "charcoal-ash",
            title: "Charcoal",
            image: "images/vanity-cabinet/charcoal-ash-600mm.webp",
          },
          {
            key: "vanity-graphite-600mm",
            productKey: "graphite",
            title: "Graphite",
            image: "images/vanity-cabinet/graphite-600mm.webp",
          },
          {
            key: "vanity-matt-black-600mm",
            productKey: "matt-black",
            title: "Matt Black",
            image: "images/vanity-cabinet/matt-black-600mm.webp",
          },
          {
            key: "vanity-oakwood-600mm",
            productKey: "oakwood",
            title: "Oakwood",
            image: "images/vanity-cabinet/oakwood-600mm.webp",
          },
        ],
      },
      "800": {
        parent: "800",
        title: "Vanity Cabinet Color",
        choices: [
          {
            key: "vanity-birch-800mm",
            productKey: "birch",
            title: "Birch",
            image: "images/vanity-cabinet/birch-800mm.webp",
          },
          {
            key: "vanity-blanco-800mm",
            productKey: "blanco",
            title: "Blanco",
            image: "images/vanity-cabinet/blanco-800mm.webp",
          },
          {
            key: "vanity-brownstone-800mm",
            productKey: "brown-stone",
            title: "Brownstone",
            image: "images/vanity-cabinet/brownstone-800mm.webp",
          },
          {
            key: "vanity-charcoal-ash-800mm",
            productKey: "charcoal-ash",
            title: "Charcoal",
            image: "images/vanity-cabinet/charcoal-ash-800mm.webp",
          },
          {
            key: "vanity-graphite-800mm",
            productKey: "graphite",
            title: "Graphite",
            image: "images/vanity-cabinet/graphite-800mm.webp",
          },
          {
            key: "vanity-matt-black-800mm",
            productKey: "matt-black",
            title: "Matt Black",
            image: "images/vanity-cabinet/matt-black-800mm.webp",
          },
          {
            key: "vanity-oakwood-800mm",
            productKey: "oakwood",
            title: "Oakwood",
            image: "images/vanity-cabinet/oakwood-800mm.webp",
          },
        ],
      },
    },
    l3: {
      "600": {
        parent: "vanity-cabinet-set-600mm",
        title: "Counter Top",
        choices: [
          {
            key: "counter-top-black-600mm",
            productKey: "black",
            title: "Black",
            image: "images/counter-top/countertop-black.webp",
          },
          {
            key: "counter-top-white-600mm",
            productKey: "white",
            title: "White",
            image: "images/counter-top/countertop-white.webp",
          },
        ],
      },
      "800": {
        parent: "800",
        title: "Counter Top",
        choices: [
          {
            key: "counter-top-black-800mm",
            productKey: "black",
            title: "Black",
            image: "images/counter-top/countertop-black.webp",
          },
          {
            key: "counter-top-white-800mm",
            productKey: "white",
            title: "White",
            image: "images/counter-top/countertop-white.webp",
          },
        ],
      },
    },
  },
};

type PopUpInfo = {
  title: string;
  subtitle?: string;
  l1: {
    title: string;
    choices: {
      key: string;
      title?: string;
      image?: string;
    }[];
  }[];
  l2: Record<
    string,
    {
      parent: string;
      title: string;
      choices: {
        key: string;
        productKey: string;
        title?: string;
        image?: string;
      }[];
    }
  >;
  l3?: Record<
    string,
    {
      parent: string;
      title: string;
      choices: {
        key: string; // for React Component
        productKey: string; // for constructing product
        title?: string;
        image?: string;
      }[];
    }
  >;
};

export default CustomizePopUp;
