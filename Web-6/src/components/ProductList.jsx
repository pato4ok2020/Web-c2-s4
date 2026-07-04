import Product from "./Product";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const ProductList = () => {
    const { products } =
        useContext(ProductsContext);

    return (
        <table className="product-list stack-large stack-exception" aria-labelledby="list-heading">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Стоимость за единицу</th>
                    <th>Количество</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <Product product={product} key={product.id} />
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;
