import "./dashboardStyling.css";

function stockForm(){
    return(
        <>
        <div className="formContainer">
        <input
            id="symbol"
            type="text"
            placeholder="Stock Symbol"
        />
        <input
            id="quantity"
            type="number"
            step="1"
            min="1"
            placeholder="Quantity"
        />
        <input
            id="price"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Purchase Price"
        />
        <button type="submit">
            Add Stock
        </button>
        </div>
        </>
    )
}

export default stockForm