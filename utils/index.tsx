import type { Discount, Product } from "../types";
export const products: Product[] = [
  {
    id: 1,
    name: "Cabify T-Shirt",
    price: 20,
    images: ["/products/shirt-min.png", "/products/shirt.jpg"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.",
    code: "TSHIRT",
  },
  {
    id: 2,
    name: "Cabify Coffee Mug",
    price: 5,
    images: ["/products/mug-min.png", "/products/mug.jpg"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.",
    code: "MUG",
  },
  {
    id: 3,
    name: "Cabify Cap",
    price: 10,
    images: ["/products/cap-min.png", "/products/cap.jpg"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum. Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, sagittis faucibus felis bibendum id.",
    code: "CAP",
  },
];

export const discounts: Discount[] = [
  {
    type: "2-for-1",
    code: "MUG",
  },
  {
    type: "bulk",
    code: "TSHIRT",
    shouldBuy: 3,
    shouldDiscount: 5,
  },
];
