import React, { useState } from "react";
import clsx from "clsx";
import useStore from "../store/useStore";
import { Button, Modal, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const CustomizePopUp: React.FC = () => {
  const customizePopUpKey = useStore((state) => state.customizePopUpKey);
  const customizeSelected = useStore((state) => state.customizeSelected);
  const clearCustomizeSelected = useStore(
    (state) => state.clearCustomizeSelected,
  );
  const opened = useStore((state) => state.modals.customize);
  const setModal = useStore((state) => state.setModal);

  const addCustomizeSelected = useStore((state) => state.addCustomizeSelected);
  const commitCustomizeSelected = useStore(
    (state) => state.commitCustomizeSelected,
  );

  const customizeSelectedLevelKeys = useStore(
    (state) => state.customizeSelectedLevelKeys,
  );
  const addCustomizeSelectedLevelKey = useStore(
    (state) => state.addCustomizeSelectedLevelKeys,
  );
  const clearCustomizeSelectedLevelKeys = useStore(
    (state) => state.clearCustomizeSelectedLevelKeys,
  );

  const [step, setStep] = useState(0);

  const popUpInfo = PopUpInfos[customizePopUpKey];
  if (!popUpInfo) {
    return null;
  }

  const handleClose = () => {
    setModal("customize", false);
    clearCustomizeSelected();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={<p className="text-3xl font-bold">{popUpInfo.title}</p>}
      centered
      classNames={{
        content: "sm:left-4 sm:absolute sm:w-[400px]",
      }}
    >
      <div className="flex flex-col gap-8">
        <p>{popUpInfo.subtitle}</p>
        {popUpInfo.l1.map((l1) => (
          <div key={l1.title} className="flex flex-col gap-4">
            <Title order={3}>{l1.title}</Title>
            <div className="grid grid-cols-3 gap-4">
              {l1.choices.map((choice) => {
                const isSelected = customizeSelected[0] === choice.key;
                return (
                  <button
                    key={choice.key}
                    className={clsx("rounded-md border-4 p-1", {
                      "border-brand": isSelected,
                      "border-transparent hover:border-gray-100": !isSelected,
                      "h-24 w-24": choice.image,
                    })}
                    onClick={() => {
                      clearCustomizeSelected();
                      addCustomizeSelected(choice.key, 0);

                      clearCustomizeSelectedLevelKeys();
                      addCustomizeSelectedLevelKey(choice.key, 0);

                      setStep(Math.max(1, step));
                    }}
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
        {step >= 1 &&
          customizeSelected.length > 0 &&
          customizeSelected[0] in popUpInfo.l2 && (
            <div className="flex flex-col gap-4">
              <Title order={3}>
                {popUpInfo.l2[customizeSelected[0]].title}
              </Title>
              <div className="grid grid-cols-3 items-center justify-items-center gap-4">
                {popUpInfo.l2[customizeSelectedLevelKeys[0]].choices.map(
                  (choice) => {
                    const selected = customizeSelected[1] === choice.productKey;
                    const currentRecord =
                      popUpInfo.l2[customizeSelectedLevelKeys[0]];
                    return (
                      <button
                        key={choice.key}
                        className={clsx("rounded-md border-4", {
                          "border-brand": selected,
                          "border-transparent hover:border-gray-300": !selected,
                          "h-24 w-24": choice.image,
                        })}
                        onClick={() => {
                          addCustomizeSelected(choice.productKey, 1);

                          if (choice.nextLevelKey) {
                            addCustomizeSelectedLevelKey(
                              choice.nextLevelKey,
                              1,
                            );
                          } else if (currentRecord.nextLevelKey) {
                            addCustomizeSelectedLevelKey(
                              currentRecord.nextLevelKey,
                              1,
                            );
                          }
                          setStep(Math.max(2, step));
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
                  },
                )}
              </div>
            </div>
          )}
        {step >= 2 &&
          popUpInfo.l3 &&
          customizeSelectedLevelKeys[1] in popUpInfo.l3 && (
            <div className="flex flex-col gap-4">
              <Title order={3}>
                {popUpInfo.l3[customizeSelectedLevelKeys[1]].title}
              </Title>
              <div className="grid grid-cols-3 items-center justify-items-center gap-4">
                {popUpInfo.l3[customizeSelectedLevelKeys[1]].choices.map(
                  (choice) => {
                    const selected = customizeSelected[2] === choice.productKey;
                    return (
                      <button
                        key={choice.key}
                        className={clsx("rounded-md border-4 p-2", {
                          "border-brand": selected,
                          "border-transparent hover:border-gray-300": !selected,
                          "h-24 w-24": choice.image,
                        })}
                        onClick={() => {
                          addCustomizeSelected(choice.productKey, 2);
                          setStep(Math.max(3, step));
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
                  },
                )}
              </div>
            </div>
          )}
        {step >= popUpInfo.maxStep && (
          <Button
            onClick={() => {
              commitCustomizeSelected();
              notifications.show({
                title: "Success",
                message: "Your changes have been saved",
                position: "top-center",
              });
              handleClose();
              setStep(0);
            }}
          >
            {popUpInfo.buttonText ?? "Save"}
          </Button>
        )}
      </div>
    </Modal>
  );
};

const PopUpInfos: Record<string, PopUpInfo> = {
  wallpaper: {
    title: "Wallpaper",
    subtitle: "Choose a wallpaper for your bathroom",
    buttonText: "Save",
    maxStep: 2,
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
    buttonText: "Add Furniture",
    maxStep: 3,
    l1: [
      {
        title: "Sizes",
        choices: [
          {
            key: "500",
            title: "500mm",
          },
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
      "500": {
        parent: "500",
        nextLevelKey: "500-hybrid",
        title: "Cabinet",
        choices: [
          {
            key: "vanity-cabinet-hybrid-pebble-500mm",
            productKey: "hybrid-pebble",
            image: "images/vanity-cabinet/hybrid-pebble-500mm.webp",
          },
          {
            key: "vanity-cabinet-hybrid-pine-500mm",
            productKey: "hybrid-pine",
            image: "images/vanity-cabinet/hybrid-pine-500mm.webp",
          },
          {
            key: "vanity-cabinet-hybrid-walnut-500mm",
            productKey: "hybrid-walnut",
            image: "images/vanity-cabinet/hybrid-walnut-500mm.webp",
          },
        ],
      },
      "600": {
        parent: "600",
        nextLevelKey: "600-normal",
        title: "Cabinet",
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
          {
            key: "vanity-hybrid-pebble-600mm",
            productKey: "hybrid-pebble",
            title: "Hybrid Pebble",
            image: "images/vanity-cabinet/hybrid-pebble-600mm.webp",
            nextLevelKey: "600-hybrid",
          },
          {
            key: "vanity-hybrid-pine-600mm",
            productKey: "hybrid-pine",
            title: "Hybrid Pine",
            image: "images/vanity-cabinet/hybrid-pine-600mm.webp",
            nextLevelKey: "600-hybrid",
          },
          {
            key: "vanity-hybrid-walnut-600mm",
            productKey: "hybrid-walnut",
            title: "Hybrid Walnut",
            image: "images/vanity-cabinet/hybrid-walnut-600mm.webp",
            nextLevelKey: "600-hybrid",
          },
        ],
      },
      "800": {
        nextLevelKey: "800-normal",
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
          {
            key: "vanity-hybrid-pebble-800mm",
            productKey: "hybrid-pebble",
            title: "Hybrid Pebble",
            image: "images/vanity-cabinet/hybrid-pebble-800mm.webp",
            nextLevelKey: "800-hybrid",
          },
          {
            key: "vanity-hybrid-pine-800mm",
            productKey: "hybrid-pine",
            title: "Hybrid Pine",
            image: "images/vanity-cabinet/hybrid-pine-800mm.webp",
            nextLevelKey: "800-hybrid",
          },
          {
            key: "vanity-hybrid-walnut-800mm",
            productKey: "hybrid-walnut",
            title: "Hybrid Walnut",
            image: "images/vanity-cabinet/hybrid-walnut-800mm.webp",
            nextLevelKey: "800-hybrid",
          },
        ],
      },
    },
    l3: {
      "500-hybrid": {
        parent: "500",
        title: "Insert Basin",
        choices: [
          {
            key: "insert-basin-ceramic-500mm",
            productKey: "insert-basin-ceramic",
            title: "Ceramic Helios",
            image: "images/insert-basin/ceramic-helios.webp",
          },
          {
            key: "insert-basin-glass-black-500mm",
            productKey: "insert-basin-glass-black",
            title: "Glass Black",
            image: "images/insert-basin/glass-black.webp",
          },
          {
            key: "insert-basin-glass-white-500mm",
            productKey: "insert-basin-glass-white",
            title: "Glass White",
            image: "images/insert-basin/glass-white.webp",
          },
        ],
      },
      "600-normal": {
        parent: "600",
        title: "Counter Top",
        choices: [
          {
            key: "counter-top-black-600mm",
            productKey: "counter-top-black",
            title: "Black",
            image: "images/counter-top/countertop-black.webp",
          },
          {
            key: "counter-top-white-600mm",
            productKey: "counter-top-white",
            title: "White",
            image: "images/counter-top/countertop-white.webp",
          },
        ],
      },
      "600-hybrid": {
        parent: "600-hybrid",
        title: "Insert Basin",
        choices: [
          {
            key: "insert-basin-ceramic-600mm",
            productKey: "insert-basin-ceramic",
            title: "Ceramic Helios",
            image: "images/insert-basin/ceramic-helios.webp",
          },
          {
            key: "insert-basin-glass-black-600mm",
            productKey: "insert-basin-glass-black",
            title: "Glass Black",
            image: "images/insert-basin/glass-black.webp",
          },
          {
            key: "insert-basin-glass-white-600mm",
            productKey: "insert-basin-glass-white",
            title: "Glass White",
            image: "images/insert-basin/glass-white.webp",
          },
        ],
      },
      "800-normal": {
        parent: "800",
        title: "Counter Top",
        choices: [
          {
            key: "counter-top-black-800mm",
            productKey: "counter-top-black",
            title: "Black",
            image: "images/counter-top/countertop-black.webp",
          },
          {
            key: "counter-top-white-800mm",
            productKey: "counter-top-white",
            title: "White",
            image: "images/counter-top/countertop-white.webp",
          },
        ],
      },
      "800-hybrid": {
        parent: "800-hybrid",
        title: "Insert Basin",
        choices: [
          {
            key: "insert-basin-ceramic-800mm",
            productKey: "insert-basin-ceramic",
            title: "Ceramic Helios",
            image: "images/insert-basin/ceramic-helios.webp",
          },
          {
            key: "insert-basin-glass-black-800mm",
            productKey: "insert-basin-glass-black",
            title: "Glass Black",
            image: "images/insert-basin/glass-black.webp",
          },
          {
            key: "insert-basin-glass-white-800mm",
            productKey: "insert-basin-glass-white",
            title: "Glass White",
            image: "images/insert-basin/glass-white.webp",
          },
        ],
      },
    },
  },
};

type PopUpInfo = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  maxStep: number;
  l1: {
    title: string;
    choices: {
      key: string;
      title?: string;
      image?: string;
    }[];
  }[];
  l2: Record<string, ProductRecord>;
  l3?: Record<string, ProductRecord>;
};

type ProductRecord = {
  parent: string;
  title: string;
  nextLevelKey?: string; // to determine the next level (record-level)
  choices: ProductChoice[];
};

type ProductChoice = {
  key: string; // for React Component
  productKey: string; // for constructing product
  nextLevelKey?: string; // to determine the next level (choice-level)
  title?: string;
  image?: string;
};

export default CustomizePopUp;
