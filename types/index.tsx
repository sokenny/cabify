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

export interface ICheckout {
  discounts: Discount[];
  subscribe(stateVariable: any): any;
  subscriptions: any[];
  products: Product[];
  cart: string[];
  scan(code: string): any;
  remove(code: string): this;
  itemTotal(code: string): number;
  itemQty(code: string): number;
  getDiscountsApplied(): any[];
  getDiscountRow(discount: Discount): any;
  totalDiscounted(): number;
  grossTotal(): number;
  total(): number;
}
