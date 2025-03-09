import { createContext, useState } from "react";

// Create Stock Context
export const StockContext = createContext();

// Stock Provider Component
export function StockProvider({ children }) {
    const [stocks, setStocks] = useState([]); // No LocalStorage, just React state

    // Function to add a new stock
    const addStock = (newStock) => {
        setStocks((prevStocks) => [...prevStocks, newStock]);
    };

    return (
        <StockContext.Provider value={{ stocks, addStock }}>
            {children}
        </StockContext.Provider>
    );
}
