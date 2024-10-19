import { Modal, Title, Text } from "@mantine/core";
import useStore from "../store/useStore";

const ShoppingCartPopUp = () => {
  const opened = useStore((state) => state.modals.shoppingCart);
  const setModal = useStore((state) => state.setModal);
  const close = () => setModal("shoppingCart", false);
  const cartItems = useStore((state) => state.cartItems);

  const chosenPackage = useStore((state) => state.package);

  return (
    <Modal
      opened={opened}
      onClose={close}
      classNames={{
        content: "sm:right-8 sm:absolute sm:w-[500px]",
        title: "text-xl font-bold",
      }}
      centered
      title={"Shopping Cart"}
    >
      <div className="flex flex-col gap-4">
        <div>
          <Title order={5}>Chosen Package </Title>
          <Text className="capitalize">{chosenPackage}</Text>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Title order={5}>Included Items</Title>
            <Title order={5}>Price</Title>
          </div>
          {cartItems.map((item) => (
            <div key={item.key} className="flex justify-between">
              <p>{item.name}</p>
              <p>0</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ShoppingCartPopUp;
