export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  code: string;
};

export interface ICheckout {
  /**
   * Scans a product adding it to the current cart.
   * @param code The product identifier
   * @returns itself to allow function chaining
   */
  subscribe(stateVariable: any): any;
  subscriptions: any[];
  products: Product[];
  cart: string[];
  scan(code: string): any;
  remove(code: string): this;
  /**
   * Returns the value of all cart products with the discounts applied.
   */
  total(): number;
  itemTotal(code: string): number;
  itemQty(code: string): number;
}
