import { IconShoppingCartFilled } from "@tabler/icons-react";
import useStore from "../store/useStore";

const ShoppingCartFloating = () => {
  const selectedPackage = useStore((state) => state.package);
  const setModal = useStore((state) => state.setModal);
  return (
    <button
      className="md-4 fixed right-4 top-4 flex items-center gap-2 rounded-full bg-brand-800 p-4"
      onClick={() => setModal("shoppingCart", true)}
    >
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
    </button>
  );
};

const startingPrices = {
  default: 0,
  enhanced: 2900,
  premium: 4900,
  luxury: 7900,
};

export default ShoppingCartFloating;
