import { ReactNode } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  images: [string, string];
  description: string;
  code: string;
};

export type Modal = ReactNode | false;

export type Discount = {
  type: "2-for-1" | "bulk";
  code: string;
  shouldBuy?: number;
  shouldDiscount?: number;
};

export type AppliedDiscount = {
  label: string;
  priceDiscounted: number;
};

export interface ICheckout {
  discounts: Discount[];
  subscribe(
    stateVariable: React.Dispatch<React.SetStateAction<string[]>>
  ): void;
  subscriptions: React.Dispatch<React.SetStateAction<string[]>>[];
  products: Product[];
  cart: string[];
  scan(code: string): this;
  remove(code: string): this;
  itemTotal(code: string): number;
  itemQty(code: string): number;
  getDiscountsApplied(): AppliedDiscount[];
  getDiscountRow(discount: Discount): AppliedDiscount;
  totalDiscounted(): number;
  grossTotal(): number;
  total(): number;
}
