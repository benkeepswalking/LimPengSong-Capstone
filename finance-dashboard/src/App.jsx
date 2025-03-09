import "./App.css";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import { StockProvider } from "./contexts/StockContext.jsx";
import financeIcon from "./assets/finance-icon.png";

function App() {
    return (
        <StockProvider>
            <div className="title-container">
                <img src={financeIcon} alt="Finance Icon" className="finance-icon" />
                <h1>My Finance Dashboard</h1>
            </div>
            <StockForm />
            <StockList />
        </StockProvider>
    );
}

export default App;