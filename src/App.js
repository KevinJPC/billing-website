import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Product } from "./features/components/Product"
import { Login } from "./features/components/Login"
import { Navbar } from "./features/components/Navbar"
import { BillState } from './features/components/BillState'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Navbar/>
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/ConsultarProducto" element={<Product/>}/>
      <Route exact path="/ConsultarFactura" element={<BillState/>}/>
    </Routes>
    </div>
  </Router>
  );
}

export default App;
