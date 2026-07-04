import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const ProductsWholeCost = () => {
    const { products } = useContext(ProductsContext);

    let total = 0;
    let tempWholeCost = products.reduce((accumulator, product) => accumulator + product.price * product.amount, total);

    return <h2 id="list-heading"> Общая стоимость: {tempWholeCost} </h2>;
};

export default ProductsWholeCost;
