import { useState, useEffect } from "react";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import ProductsWholeCost from "./components/ProductsWholeCost";
import { ProductsProvider } from "./context/ProductsProvider";

const App = () => {
    return (
        <ProductsProvider>
            <div className="product-calculator">
                <h1>Калькулятор продуктов</h1>
                <AddProductForm />
                <ProductsWholeCost />
                <ProductList />
            </div>
        </ProductsProvider>
    );
};

export default App;

