import { useState } from "react";
import "./DashboardStyling.css";

function StockForm() {
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!symbol || !quantity || !purchasePrice) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        setErrorMessage("");

        console.log("Stock Data Submitted:", { symbol, quantity, purchasePrice });

        setSymbol("");
        setQuantity("");
        setPurchasePrice("");
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="formContainer">
                {errorMessage && <p className="error">{errorMessage}</p>}
                <input
                    id="symbol"
                    type="text"
                    placeholder="Stock Symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                />
                <input
                    id="quantity"
                    type="number"
                    step="1"
                    min="1"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Purchase Price"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                />
                <button type="submit">Add Stock</button>
            </form>
        </>
    );
}

export default StockForm;
