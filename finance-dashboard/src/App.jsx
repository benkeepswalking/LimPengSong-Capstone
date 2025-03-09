import { useState } from 'react'
import './App.css'
import StockForm from './components/stockForm'
import StockList from './components/stockList'

function App() {


  return (
    <>
    <h1>My Finance Dashboard</h1>
    <StockForm />
    <StockList />
    </>
  )
}

export default App
