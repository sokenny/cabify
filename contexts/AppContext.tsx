import React, { useState, useMemo } from "react";
import { Checkout } from "../utils/cart";
import type { Discount, Product, Modal } from "../types";

interface AppContextInterface {
  products: Product[];
  checkout: Checkout;
  modal: Modal;
  setModal: (modal: Modal) => void;
}

const AppContext = React.createContext<AppContextInterface | null>(null);

export function AppProvider(props: any) {
  // Set as state variable as normally we would fetch them from an API and set them in state
  const [products, setProducts] = useState<Product[]>([
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
  ]);
  const [modal, setModal] = useState<Modal>(false);

  const discounts: Discount[] = [
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

  const checkout = new Checkout(products, discounts);

  const value = useMemo(() => {
    return {
      products,
      checkout,
      modal,
      setModal,
    };
  }, [products, checkout, modal, setModal]);

  return <AppContext.Provider value={value} {...props} />;
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}
