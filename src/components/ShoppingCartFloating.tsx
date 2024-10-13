import { IconShoppingCartFilled } from "@tabler/icons-react";
import useStore from "../store/useStore";

const ShoppingCartFloating = () => {
  const selectedPackage = useStore((state) => state.package);
  return (
    <div className="md-4 bg-brand-800 fixed right-4 top-4 flex items-center gap-2 rounded-full p-4">
      {selectedPackage !== "" && (
        <p className="text-white">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(startingPrices[selectedPackage])}
        </p>
      )}
      <IconShoppingCartFilled size={24} className="text-white" />
    </div>
  );
};

const startingPrices = {
  default: 0,
  enhanced: 2900,
  premium: 4900,
  luxury: 7900,
};

export default ShoppingCartFloating;
