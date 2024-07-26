import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<ProductList/>} />
        <Route path="/product/:productId" component={<ProductDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;
