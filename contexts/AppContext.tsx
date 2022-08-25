import React, { useState, useMemo } from 'react';
import type { Product } from '../types';

interface AppContextInterface {
    products: Product[];
}

const AppContext = React.createContext<AppContextInterface | null>(null);

export function AppProvider(props:any){
    
    // Set as state variable as normally we would fetch them from an API and set them in state
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: 'Cabify T-Shirt',
            price: 20,
            image: 'products/shirt.png',
            code: 'TSHIRT',
          },
          {
            id: 2,
            name: 'Cabify Coffee Mug',
            price: 5,
            image: 'products/mug.png',
            code: 'MUG',
          },
          {
            id: 3,
            name: 'Cabify Cap',
            price: 10,
            image: 'products/cap.png',
            code: 'CAP',
          },
    ]);

    const value = useMemo(()=>{
        return {
           products
        }
    }, [products]);
    
    return <AppContext.Provider value={value} {...props} />
}

export function useAppContext(){
    const context = React.useContext(AppContext);
    if(!context){
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return context;
}