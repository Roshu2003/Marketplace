import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ProductForm from "./components/ProductForm";
import OrderForm from "./components/OrderForm";
import OrderPage from "./components/OrderPage";
import EditProductPage from "./pages/EditProductPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-product' element={<ProductForm />} />
        <Route path='/edit-product/:id' element={<EditProductPage />} />
        <Route path='/order/:id' element={<OrderForm />} />
        <Route path='/orders' element={<OrderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
