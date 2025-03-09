import "./DashboardStyling.css";

function StockList(){

    return (
    <>
        <div>
        <h2>Stock List</h2>
        <p>No stocks added yet</p>
        </div>
        <div className="stockItem">
            <p id="field-symbol">Symbol: AAPL</p>
            <p>Quantity: 1</p>
            <p>Purchase Price: 1</p>
            <p>Current Price: 100</p>
            <p id="field-profitLoss">Profit/Loss:</p>
        </div>
    </>
    )
}

export default StockList