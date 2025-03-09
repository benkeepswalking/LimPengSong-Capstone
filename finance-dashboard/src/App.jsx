import { useState } from 'react';
import './App.css';
import StockForm from './components/StockForm';
import StockList from './components/StockList';

function App() {
    const [stocks, setStocks] = useState([]);

    const addStock = (newStock) => {
        setStocks([...stocks, newStock]);
    };

    return (
        <>
            <h1>My Finance Dashboard</h1>
            <StockForm addStock={addStock} />
            <StockList stocks={stocks} />
        </>
    );
}

export default App;