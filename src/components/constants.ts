export const WALL_THICKNESS = 0.075;

export const packageChoices = [
  { value: "default", label: "BTO default" },
  { value: "enhanced", label: "Enhanced" },
  {
    value: "premium",
    label: "Premium (Coming Soon)",
    disabled: true,
  },
  { value: "luxury", label: "Luxury (Coming Soon)", disabled: true },
];

export const packageTiers = ["default", "enhanced", "premium", "luxury"];

export const isPackageTierSufficient = (
  minPackageTier: string,
  selectedPackage: string,
) => {
  for (let i = 0; i < packageTiers.length; i++) {
    if (packageTiers[i] === minPackageTier) {
      return true;
    }
    if (packageTiers[i] === selectedPackage) {
      return false;
    }
  }

  return false;
};
