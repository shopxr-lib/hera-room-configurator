import React from "react";
import clsx from "clsx";
import useStore from "../store/useStore";

type Props = object;

const CustomizePopUp: React.FC<Props> = () => {
  const customizePopUpKey = useStore((state) => state.customizePopUpKey);
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
    <div className="fixed left-8 h-[500px] w-[300px] overflow-y-scroll rounded-lg bg-white p-8">
      <div className="prose">
        <h1>{popUpInfo.title}</h1>
        <p>{popUpInfo.subtitle}</p>
        {popUpInfo.l1.map((l1) => (
          <div key={l1.title}>
            <h2>{l1.title}</h2>
            <div className="grid grid-cols-3 gap-4">
              {l1.choices.map((choice) => (
                <button
                  key={choice.key}
                  className={clsx("rounded-md border border-gray-300 p-1", {
                    "border-brand border-2":
                      customizeSelected[0] === choice.key,
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
              ))}
            </div>
          </div>
        ))}
        {customizeSelected.length > 0 &&
          customizeSelected[0] in popUpInfo.l2 && (
            <div>
              <h2>{popUpInfo.l2[customizeSelected[0]].title}</h2>
              <div className="grid grid-cols-3 items-center gap-4">
                {popUpInfo.l2[customizeSelected[0]].choices.map((choice) => {
                  const selected = customizeSelected[1] === choice.key;
                  return (
                    <button
                      key={choice.key}
                      className={clsx("rounded-md border", {
                        "border-brand border-2": selected,
                      })}
                      onClick={() => {
                        addCustomizeSelected(choice.key, 1);
                        commitCustomizeSelected();
                      }}
                    >
                      {choice.image ? (
                        <img
                          className="m-0 h-16 w-16"
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
            image: "/src/assets/images/wallpaper/bto-ceiling-texture.webp",
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
            image: "/src/assets/images/wallpaper/marble-wall.webp",
          },
        ],
      },
      floor: {
        parent: "floor",
        title: "Floor",
        choices: [
          {
            key: "ambient-occlusion",
            title: "Ambient Occlusion",
            image:
              "/src/assets/images/wallpaper/bto-floorTile-AmbientOcclusion.webp",
          },
          {
            key: "base-color",
            title: "Base Color",
            image: "/src/assets/images/wallpaper/bto-floorTile-BaseColor.webp",
          },
          {
            key: "displacement",
            title: "Displacement",
            image:
              "/src/assets/images/wallpaper/bto-floorTile-Displacement.webp",
          },
          {
            key: "metallic",
            title: "Metallic",
            image: "/src/assets/images/wallpaper/bto-floorTile-Metallic.webp",
          },
          {
            key: "normal",
            title: "Normal",
            image: "/src/assets/images/wallpaper/bto-floorTile-Normal.webp",
          },
          {
            key: "roughness",
            title: "Roughness",
            image: "/src/assets/images/wallpaper/bto-floorTile-Roughness.webp",
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
