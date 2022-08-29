import type {
  ICheckout,
  Product,
  Discount,
  AppliedDiscount,
  Subscriptions,
  Cart,
} from "../../types";

export class Checkout implements ICheckout {
  public cart: Cart;
  public products: Product[];
  public subscriptions: Subscriptions;
  public discounts: Discount[];

  constructor(
    products: Product[],
    discounts: Discount[] = [],
    cart: Cart = []
  ) {
    this.cart = cart;
    this.products = products;
    this.subscriptions = [];
    this.discounts = discounts;
  }

  scan(code: string): this {
    const product = this.products.find(product => product.code === code);
    if (product) {
      this.cart.push(product.code);
    } else {
      throw new Error("Product not found");
    }
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
    this.subscriptions.forEach(subscription => {
      subscription([...this.cart]);
    });
    return this;
  }

  subscribe(setter: (cart: Cart) => void): void {
    this.subscriptions.push(setter);
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

  getDiscountsApplied(): AppliedDiscount[] {
    const discountsApplied: AppliedDiscount[] = [];
    const uniqueProducts = this.cart.filter(
      (item, index) => this.cart.indexOf(item) === index
    );
    uniqueProducts.forEach(code => {
      const discount = this.discounts.find(discount => discount.code === code);
      if (discount !== undefined) {
        if (discount.type === "bulk" && discount.shouldBuy) {
          if (this.itemQty(code) >= discount.shouldBuy) {
            discountsApplied.push(this.getDiscountRow(discount));
          }
        } else if (discount.type === "2-for-1") {
          const amountOfDiscounts = Math.floor(this.itemQty(code) / 2);
          for (let i = 0; i < amountOfDiscounts; i++) {
            discountsApplied.push(this.getDiscountRow(discount));
          }
        }
      }
    });
    return discountsApplied;
  }

  getDiscountRow(discount: Discount): AppliedDiscount {
    const product = this.products.find(
      product => product.code === discount.code
    );
    if (!product) throw new Error("Product not found");
    const prefix = discount.type === "2-for-1" ? `2x1` : discount.shouldBuy;
    const label = `${prefix} ${product?.name} offer`;
    const totalProductPrice = product?.price * this.itemQty(product?.code);
    const priceDiscounted =
      discount.type === "2-for-1"
        ? product?.price
        : totalProductPrice *
          (discount.shouldDiscount ? discount.shouldDiscount / 100 : 1);
    return { label, priceDiscounted };
  }

  totalDiscounted(): number {
    const discounts = this.getDiscountsApplied();
    const totalDiscounted = discounts.reduce((acc, discount) => {
      return acc + discount.priceDiscounted;
    }, 0);
    return totalDiscounted;
  }

  grossTotal(): number {
    const total = this.cart.reduce((acc, code) => {
      const product = this.products.find(product => product.code === code);
      if (product) {
        return acc + product.price;
      }
      return acc;
    }, 0);
    return total;
  }

  total(): number {
    return this.grossTotal() - this.totalDiscounted();
  }
}
