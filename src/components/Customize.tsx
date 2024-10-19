import React from "react";
import useStore from "../store/useStore";
import clsx from "clsx";
import { isPackageTierSufficient } from "../lib/utils";

type Props = object;

const Customize: React.FC<Props> = () => {
  const customizePopUpKey = useStore((state) => state.customizePopUpKey);
  const setCustomizePopUpKey = useStore((state) => state.setCustomizePopUpKey);
  const selectedPackage = useStore((state) => state.package);

  return (
    <div className="fixed bottom-4 flex items-center space-x-2 rounded-md bg-white p-2 sm:left-4">
      {productIcons
        .filter(
          (productIcon) =>
            selectedPackage === "" ||
            isPackageTierSufficient(
              productIcon.minPackageTier,
              selectedPackage,
            ),
        )
        .map((productIcon) => {
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
    src: "images/icons/wallpaper-icon.png",
    label: "Wallpaper",
    minPackageTier: "default",
  },
  {
    key: "vanitycabinet",
    src: "images/icons/vanity-cabinet-icon.png",
    label: "Vanity Cabinet",
    minPackageTier: "enhanced",
  },
  {
    key: "showerscreen",
    src: "images/icons/shower-screen-icon.png",
    label: "Shower Screen",
    minPackageTier: "enhanced",
  },
  {
    key: "toiletbowl",
    src: "images/icons/toiletbowl-icon.png",
    label: "Toiletbowl",
    minPackageTier: "enhanced",
  },
];

export default Customize;
