import { Dispatch, SetStateAction } from "react";
import type { ICheckout, Product } from "../../types";

export class Checkout implements ICheckout {
  public cart: string[];
  public products: Product[];
  public subscriptions: any[];

  constructor(products: Product[], cart: string[] = []) {
    this.cart = cart;
    this.products = products;
    this.subscriptions = [];
  }

  scan(code: string): this {
    console.log("Called scan with code: ", code);
    const product = this.products.find(product => product.code === code);
    if (product) {
      this.cart.push(product.code);
    } else {
      throw new Error("Product not found");
    }
    // if this.subscriptions is not undefined, call all subscriptions
    this.subscriptions.forEach(subscription => {
      subscription([...this.cart]);
    });
    return this;
  }

  remove(code: string): this {
    const index = this.cart.findIndex(item => item === code);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    // if (this.subscribe !== undefined) {
    //   this.subscribe([...this.cart]);
    // }
    return this;
  }

  // Add subscribe method that receives function and pushes it to subscriptions array
  subscribe(stateVariable: any): any {
    this.subscriptions.push(stateVariable);
  }

  itemTotal(code: string): number {
    const quantity = this.itemQty(code);
    const product = this.products.find(product => product.code === code);
    if (product) {
      return quantity * product.price;
    } else {
      throw new Error("Product not found");
    }
  }

  itemQty(code: string): number {
    const quantity = this.cart.filter(item => item === code).length;
    return quantity;
  }

  total(): number {
    const total = this.cart.reduce((acc, code) => {
      const product = this.products.find(product => product.code === code);
      if (product) {
        return acc + product.price;
      }
      return acc;
    }, 0);
    return total;
  }
}
