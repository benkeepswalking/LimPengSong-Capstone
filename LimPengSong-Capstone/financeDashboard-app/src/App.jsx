import { useState } from 'react';
import Header from './components/Header'
import StockPurchaseForm from './components/StockPurchaseForm'
import Dashboard from './components/Dashboard';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header title="My Finance Dashboard" />
      <StockPurchaseForm />
      <Dashboard />      
    </div>
  )
}

export default App
