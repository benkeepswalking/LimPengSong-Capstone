import "./App.css";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import { StockProvider } from "./contexts/StockContext.jsx";

function App() {
    return (
        <StockProvider>
            <h1>My Finance Dashboard</h1>
            <StockForm />
            <StockList />
        </StockProvider>
    );
}

export default App;
