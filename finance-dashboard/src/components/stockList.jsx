import "./DashboardStyling.css";

function StockList({ stocks = [] }) {
    return (
        <div>
            <h2>Stock List</h2>
            {stocks.length === 0 ? (
                <p>No stocks added yet</p>
            ) : (
                stocks.map((stock, index) => (
                    <div key={index} className="stockItem">
                        <p id="field-symbol">Symbol: {stock.symbol}</p>
                        <p>Quantity: {stock.quantity}</p>
                        <p>Purchase Price: {stock.purchasePrice}</p>
                        <p>Current Price: -</p> {/* Placeholder for live price */}
                        <p id="field-profitLoss">Profit/Loss: -</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default StockList;
