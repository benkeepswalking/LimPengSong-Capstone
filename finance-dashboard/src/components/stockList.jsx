import { useState, useEffect } from "react";
import "./DashboardStyling.css";

const API_KEY = "X0CXTX83GWDC6REI";
const BASE_URL = "https://www.alphavantage.co/query";

function StockList({ stocks = [] }) {
    const [livePrices, setLivePrices] = useState({});
    const [fetchedStocks, setFetchedStocks] = useState(new Set());
    const [loading, setLoading] = useState(false);

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
            const newStocks = stocks.filter(stock => !fetchedStocks.has(stock.symbol));

            if (newStocks.length === 0) return;

            const prices = {};
            await Promise.all(newStocks.map(async (stock) => {
                const price = await fetchWithRetry(stock.symbol);
                prices[stock.symbol] = price;
            }));

            setLivePrices(prevPrices => ({ ...prevPrices, ...prices }));
            setFetchedStocks(prevSet => new Set([...prevSet, ...newStocks.map(stock => stock.symbol)]));
            setLoading(false);
        }

        if (stocks.length > 0) {
            fetchStockPrices();
        }
    }, [stocks]);

    return (
        <div>
            <h2>Stock List</h2>
            {loading ? <p>Fetching latest stock prices...</p> : null}
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
