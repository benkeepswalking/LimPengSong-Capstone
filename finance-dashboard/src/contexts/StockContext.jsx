import { createContext, useState } from "react";

export const StockContext = createContext();

export function StockProvider({ children }) {
    const [stocks, setStocks] = useState([]);
    
    const addStock = (newStock) => {
        setStocks((prevStocks) => [...prevStocks, newStock]);
    };

    return (
        <StockContext.Provider value={{ stocks, addStock }}>
            {children}
        </StockContext.Provider>
    );
}
