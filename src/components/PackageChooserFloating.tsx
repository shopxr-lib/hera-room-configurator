import { Select } from "@mantine/core";
import useStore from "../store/useStore";
import { packageChoices } from "./constants";

const PackagePopUpFloating: React.FC = () => {
  const selectedPackage = useStore((state) => state.package);
  const setSelectedPackage = useStore((state) => state.setPackage);

  if (!selectedPackage) {
    return null;
  }

  return (
    <div className="fixed left-4 top-4 rounded-md bg-white p-4">
      <Select
        label="Change package"
        data={packageChoices}
        value={selectedPackage}
        onChange={(_, option) => {
          setSelectedPackage(option.value);
        }}
      ></Select>
    </div>
  );
};

export default PackagePopUpFloating;
