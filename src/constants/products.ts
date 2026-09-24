export const PRODUCT_PRICES = {
  material: {
    silicone: {
      price: 1.00,
    },
    polycarbonate: {
      price: 4.00,
    },
  },
  finish: {
    smooth: {
      price: 1.00,
    },
    textured: {
      price: 4.00,
    },
  },
} as const;

export const BASE_PRICE = 12.00 as const;
