// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950

import { PRODUCT_PRICES } from "@/constants/products";

export const COLORS = [
  { label: "Black", value: "black", tw: "zinc-900" },
  { label: "Blue", value: "blue", tw: "blue-950" },
  { label: "Rose", value: "rose", tw: "rose-950" },
] as const;

export const MODELS = {
  name: "models",
  options: [
    { label: "iPhone X", value: "iphonex" },
    { label: "iPhone 11", value: "iphonex11" },
    { label: "iPhone 12", value: "iphone12" },
    { label: "iPhone 13", value: "iphone13" },
    { label: "iPhone 14", value: "iphone14" },
    { label: "iPhone 15", value: "iphone15" },
    { label: "iPhone 16", value: "iphone16" },
    { label: "iPhone 17", value: "iphone17" },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: "A reliable & flexible silicone cover for your iPhone.",
      price: PRODUCT_PRICES.material.silicone.price,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description:
        "A  soft polycarbonate, scratch resistant cover for your iPhone.",
      price: PRODUCT_PRICES.material.polycarbonate.price,
    },
  ],
} as const;

export const FINISHING = {
  name: "finish",
  options: [
    {
      label: "Smooth",
      value: "sooth",
      description: "Smooth & luxurious finishing.",
      price: PRODUCT_PRICES.finish.smooth.price,
    },
    {
      label: "Textured",
      value: "textured",
      description: "Soft textured better grip.",
      price: PRODUCT_PRICES.finish.textured.price,
    },
  ],
} as const;
