import { useState, useEffect, useRef, useContext } from "react";
import "./DashboardStyling.css";
import { StockContext } from "../contexts/StockContext.jsx";

const API_KEY = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

function StockList() {
    const { stocks } = useContext(StockContext);
    const [livePrices, setLivePrices] = useState({});
    const [loading, setLoading] = useState(false);
    const fetchedStocksRef = useRef(new Set()); // Tracks already fetched stock symbols

    async function fetchWithRetry(stockSymbol, retries = 3, delayMs = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                const price = data["Global Quote"]?.["05. price"];

                return price ? parseFloat(price).toFixed(2) : "N/A";
            } catch (error) {
                console.error(`Error fetching ${stockSymbol}, attempt ${i + 1}:`, error);
                if (i < retries - 1) await new Promise(res => setTimeout(res, delayMs));
            }
        }
        return "N/A";
    }

    useEffect(() => {
        async function fetchStockPrices() {
            setLoading(true);
            const newStocks = stocks.filter(stock => !fetchedStocksRef.current.has(stock.symbol));

            if (newStocks.length === 0) {
                setLoading(false);
                return;
            }

            const prices = {};
            await Promise.all(newStocks.map(async (stock) => {
                const price = await fetchWithRetry(stock.symbol);
                prices[stock.symbol] = price || "N/A"; // Prevents undefined values
            }));

            setLivePrices(prevPrices => ({ ...prevPrices, ...prices }));
            newStocks.forEach(stock => fetchedStocksRef.current.add(stock.symbol));
            setLoading(false);
        }

        if (stocks.length > 0) {
            fetchStockPrices();
        }
    }, [stocks]);

    return (
        <div>
            <h2>Stock List</h2>
            {loading && <p>Fetching latest stock prices...</p>}
            {stocks.length === 0 ? (
                <p>No stocks added yet</p>
            ) : (
                stocks.map((stock, index) => (
                    <div key={index} className="stockItem">
                        <p className="field-symbol">Symbol: {stock.symbol}</p>
                        <p>Quantity: {stock.quantity}</p>
                        <p>Purchase Price: ${stock.purchasePrice.toFixed(2)}</p>
                        <p>Current Price: {livePrices[stock.symbol] !== "N/A" ? `$${livePrices[stock.symbol]}` : "Unavailable"}</p>
                        <p className="field-profitLoss">
                            Profit/Loss: {livePrices[stock.symbol] && !isNaN(livePrices[stock.symbol])
                                ? `$${((livePrices[stock.symbol] - stock.purchasePrice) * stock.quantity).toFixed(2)}`
                                : "-"}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default StockList;
