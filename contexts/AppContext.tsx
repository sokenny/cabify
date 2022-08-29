import React, { useState, useMemo, useEffect } from "react";
import { Checkout } from "../utils/cart";
import { getProducts, getDiscounts } from "../api";
import type { Product, Modal } from "../types";

interface AppContextInterface {
  products: Product[];
  checkout: Checkout;
  modal: Modal;
  setModal: (modal: Modal) => void;
}

const AppContext = React.createContext<AppContextInterface | null>(null);

export function AppProvider(props: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [modal, setModal] = useState<Modal>(false);
  const [checkout, setCheckout] = useState<Checkout>(new Checkout([], []));

  useEffect(() => {
    async function initializeApp() {
      const [products, discounts] = await Promise.all([
        getProducts(),
        getDiscounts(),
      ]);
      if (products) setProducts(products);
      setCheckout(new Checkout(products, discounts));
    }
    initializeApp();
  }, []);

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
