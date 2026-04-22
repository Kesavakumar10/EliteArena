import React from "react";
import Navbar from "./Navbar";
import HomePage from "./Homepage";
import ProductGrid from "./ProductGrid";
import CartPage from "./CartPage";
import Contact from "./Contact";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Content() {
  const [page, setPage] = React.useState("Home");
  const [activePage, setActivePage] = React.useState("Home");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showCart, setShowCart] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const goToProducts = (category) => {
    setSelectedCategory(category);
    navigate("/products");
  };

  useEffect(() => {
  if (location.pathname === "/products") {
    setPage("Products");
    setActivePage("Products");  
  } else {
    setPage("Home");
    setActivePage("Home");       
  }
}, [location.pathname]);


  return (
    <>
      <Navbar setPage={setPage} activePage={activePage} setActivePage={setActivePage} goToProducts={goToProducts} openCart={setShowCart}/>
      {showCart && <CartPage />}

      {!showCart && page === "Home" && (
        <HomePage goToProducts={goToProducts} />
      )}

      {!showCart && page === "Products" && (
        <ProductGrid 
        category={selectedCategory}
        openCart={setShowCart} 
        />
      )}
      {!showCart && page === "Contact" && <Contact />}
    </>
  );
}
