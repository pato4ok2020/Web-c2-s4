import { useState, useEffect } from "react";
import { ProductsContext } from "./ProductsContext";

export const ProductsProvider = (props) => {
    const { children } = props;

    const [products, setProducts] = useState([
        { id: crypto.randomUUID(), name: "Морковь", price: 10, amount: 10 },
        { id: crypto.randomUUID(), name: "Огурец", price: 12, amount: 52 },
    ]);
    const [newProductName, setNewProductName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductAmount, setNewProductAmount] = useState("");

    const addProduct = (e) => {
        e.preventDefault();

        const newProductNameClear = newProductName.trim();
        if (!newProductNameClear) {
            alert("Заполните поле с название продукта!");
            return;
        }

        if (products.filter((product) => product.name === newProductNameClear).length !== 0) {
            alert("Каждый новый продукт должен быть уникальным!");
            return;
        }

        if (!newProductPrice) {
            alert("Введите число в поле со стоимостью за единицу продукта!");
            return;
        }

        if (newProductPrice <= 0) {
            alert("Стоимость должна быть больше нуля!");
            return;
        }

        if (!newProductAmount) {
            alert("Введите число в поле с количеством продукта!");
            return;
        }

        if (newProductAmount <= 0) {
            alert("Количество продукта должно быть больше нуля!");
            return;
        }

        setProducts([
            ...products,
            { id: crypto.randomUUID(), name: newProductNameClear, price: newProductPrice, amount: newProductAmount },
        ]);
        setNewProductAmount("");
        setNewProductName("");
        setNewProductPrice("");
    };

    const deleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const startEditProduct = (id) => {
        setProducts(
            products.map((product) =>
                product.id === id
                    ? {
                          ...product,
                          isEditing: true,
                          tempName: product.name,
                          tempAmount: product.amount,
                          tempPrice: product.price,
                      }
                    : product,
            ),
        );
    };

    const saveProduct = (id) => {
        const productToSave = products.find((p) => p.id === id);

        const tempNameClear = productToSave.tempName.trim();
        if (!tempNameClear) {
            alert("Название не может быть пустым");
            return;
        }

        const isDuplicate = products.some((product) => product.name === tempNameClear && product.id !== id);

        if (isDuplicate) {
            alert("Продукт с таким названием уже существует!");
            return;
        }

        const parsedPrice = Number(productToSave.tempPrice);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            alert("Цена должна быть числом больше 0");
            return;
        }

        const parsedAmount = Number(productToSave.tempAmount);
        if (isNaN(parsedAmount) || parsedAmount < 0) {
            alert("Количество продукта должно быть больше нуля!");
            return;
        }

        setProducts(
            products.map((product) =>
                product.id === id
                    ? {
                          ...product,
                          name: tempNameClear,
                          price: parsedPrice,
                          amount: parsedAmount,
                          isEditing: false,
                          tempName: undefined,
                          tempAmount: undefined,
                          tempPrice: undefined,
                      }
                    : product,
            ),
        );
    };

    const cancelEditProduct = (id) => {
        setProducts(
            products.map((product) =>
                product.id === id
                    ? {
                          ...product,
                          isEditing: false,
                          tempName: undefined,
                          tempAmount: undefined,
                          tempPrice: undefined,
                      }
                    : product,
            ),
        );
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                setProducts,
                newProductName,
                newProductPrice,
                newProductAmount,
                setNewProductName,
                setNewProductPrice,
                setNewProductAmount,
                addProduct,
                deleteProduct,
                startEditProduct,
                saveProduct,
                cancelEditProduct,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
