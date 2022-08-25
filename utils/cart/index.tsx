import type { ICheckout } from "../../types";
import { useAppContext } from "../../contexts/AppContext";

// Create Checkout class that implements Checkout interface

export class Checkout implements ICheckout {
  public cart: string[];

  constructor() {
    this.cart = [];
  }

  scan(code: string): this {
    const { products } = useAppContext();
    const product = products.find(product => product.code === code);
    if (product) {
      this.cart.push(product.code);
    } else {
      throw new Error("Product not found");
    }
    return this;
  }

  itemTotal(code: string): number {
    const { products } = useAppContext();
    const quantity = this.itemQty(code);
    const product = products.find(product => product.code === code);
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
    const { products } = useAppContext();
    const total = this.cart.reduce((acc, code) => {
      const product = products.find(product => product.code === code);
      if (product) {
        return acc + product.price;
      }
      return acc;
    }, 0);
    return total;
  }
}
