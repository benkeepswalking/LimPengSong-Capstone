import { useState, useContext } from "react";
import "./DashboardStyling.css";
import { StockContext } from "../contexts/StockContext.jsx";

function StockForm() {
    const { addStock } = useContext(StockContext);
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!symbol.trim() || !quantity || !purchasePrice) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        if (quantity <= 0 || purchasePrice <= 0) {
            setErrorMessage("Quantity and Purchase Price must be positive numbers.");
            return;
        }

        setErrorMessage("");

        addStock({
            symbol: symbol.trim().toUpperCase(),
            quantity: parseInt(quantity, 10),
            purchasePrice: parseFloat(purchasePrice),
        });

        setSymbol("");
        setQuantity("");
        setPurchasePrice("");
    };

    return (
        <form onSubmit={handleSubmit} className="formContainer">
            {errorMessage && <p className="error">{errorMessage}</p>}
            <input
                className="input-symbol"
                type="text"
                placeholder="Stock Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
            />
            <input
                className="input-quantity"
                type="number"
                step="1"
                min="1"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <input
                className="input-price"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Purchase Price"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
            />
            <button type="submit">Add Stock</button>
        </form>
    );
}

export default StockForm;
