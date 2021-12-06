import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Product } from "./features/components/Product"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      {/* <NavBar/> */}
    <Routes>
      <Route exact path="/" element={<Product/>}/>
    </Routes>
    </div>
  </Router>
  );
}

export default App;
