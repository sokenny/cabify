import type { Product, Discount } from "../types";
import { products, discounts } from "../utils";

export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(products);
      reject(new Error("Something went wrong"));
    }, 0);
  });
};

export const getDiscounts = (): Promise<Discount[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(discounts);
      reject(new Error("Something went wrong"));
    }, 0);
  });
};
