/*
import React from 'react'
import { Route, Routes} from 'react-router-dom';

import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import productData from './data/full-products';


function App() {
  
  return (
    <div className="App">
      <Header />
      
        <Routes>
          <Route path="/" element={<CardList data={productData} />} />
          <Route path="/product/:id" element={<SingleView data={productData} />} />
        </Routes>
      
    </div>
  );
}

export default App;
*/


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './state/CartProvider';
import Header from './components/Header';
import CardList from './components/CardList';
import SingleView from './components/SingleView';
import Cart from './components/Cart';
import Orders from './components/Orders';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/product/:id" element={<SingleView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} /> {/* Registering /orders route */}
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;