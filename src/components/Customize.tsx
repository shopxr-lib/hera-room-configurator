import React from "react";
import useStore from "../store/useStore";
import clsx from "clsx";

type Props = object;

const Customize: React.FC<Props> = () => {
  const customizePopUpKey = useStore((state) => state.customizePopUpKey);
  const setCustomizePopUpKey = useStore((state) => state.setCustomizePopUpKey);

  return (
    <div className="fixed bottom-4 flex items-center space-x-2 rounded-md bg-white p-2 sm:left-4">
      {productIcons.map((productIcon) => {
        const isSelected = customizePopUpKey === productIcon.key;
        return (
          <button
            key={productIcon.key}
            className={clsx("rounded-md border-2 p-1", {
              "border-brand": isSelected,
              "border-transparent hover:border-gray-200": !isSelected,
            })}
            onClick={() => setCustomizePopUpKey(productIcon.key)}
          >
            <img
              className="h-8"
              src={productIcon.src}
              alt={productIcon.label}
            />
          </button>
        );
      })}
    </div>
  );
};

const productIcons = [
  {
    key: "wallpaper",
    src: "/src/assets/images/icons/wallpaper-icon.png",
    label: "Wallpaper",
  },
  {
    key: "vanitycabinet",
    src: "/src/assets/images/icons/vanity-cabinet-icon.png",
    label: "Vanity Cabinet",
  },
  {
    key: "showerscreen",
    src: "/src/assets/images/icons/shower-screen-icon.png",
    label: "Shower Screen",
  },
  {
    key: "toiletbowl",
    src: "/src/assets/images/icons/toiletbowl-icon.png",
    label: "Toiletbowl",
  },
];

export default Customize;
