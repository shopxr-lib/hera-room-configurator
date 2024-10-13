import React from "react";
import clsx from "clsx";
import useStore from "../store/useStore";
import { IconX } from "@tabler/icons-react";

type Props = object;

const CustomizePopUp: React.FC<Props> = () => {
  const customizePopUpKey = useStore((state) => state.customizePopUpKey);
  const setCustomizePopUpKey = useStore((state) => state.setCustomizePopUpKey);
  const customizeSelected = useStore((state) => state.customizeSelected);

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
          <IconX cursor="pointer" onClick={() => setCustomizePopUpKey("")} />
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
              <div className="grid grid-cols-3 items-center justify-items-center gap-4">
                {popUpInfo.l2[customizeSelected[0]].choices.map((choice) => {
                  const selected = customizeSelected[1] === choice.key;
                  return (
                    <button
                      key={choice.key}
                      className={clsx("h-16 w-16 rounded-md border-4", {
                        "border-brand": selected,
                        "border-transparent hover:border-gray-300": !selected,
                      })}
                      onClick={() => {
                        addCustomizeSelected(choice.key, 1);
                        commitCustomizeSelected();
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
          },
        ],
      },
      wall: {
        parent: "wall",
        title: "Wall",
        choices: [
          {
            key: "marble",
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
            title: "Base Color",
            image: "images/wallpaper/bto-floorTile-BaseColor.webp",
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
        title?: string;
        image?: string;
      }[];
    }
  >;
};

export default CustomizePopUp;
