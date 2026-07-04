import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const Product = (props) => {
    const { product } = props;
    const { setProducts, products, saveProduct, cancelEditProduct, startEditProduct, deleteProduct } =
        useContext(ProductsContext);

    return (
        <tr className="product stack-small" onDoubleClick={() => startEditProduct(product.id)}>
            {product.isEditing ? (
                <>
                    <td>
                        <input
                            className="product-text"
                            value={product.tempName}
                            onChange={(e) =>
                                setProducts(
                                    products.map((p) => (p.id === product.id ? { ...p, tempName: e.target.value } : p)),
                                )
                            }
                        />
                    </td>

                    <td>
                        <input
                            className="product-text"
                            value={product.tempPrice}
                            onChange={(e) =>
                                setProducts(
                                    products.map((p) =>
                                        p.id === product.id ? { ...p, tempPrice: e.target.value } : p,
                                    ),
                                )
                            }
                        />
                    </td>

                    <td>
                        <input
                            className="product-text"
                            value={product.tempAmount}
                            onChange={(e) =>
                                setProducts(
                                    products.map((p) =>
                                        p.id === product.id ? { ...p, tempAmount: e.target.value } : p,
                                    ),
                                )
                            }
                        />
                    </td>

                    <td>
                        <button type="button" className="btn btn__primary" onClick={() => saveProduct(product.id)}>
                            Сохранить
                        </button>
                    </td>

                    <td>
                        <button type="button" className="btn btn__danger" onClick={() => cancelEditProduct(product.id)}>
                            Отменить
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.amount}</td>
                    <td>
                        <button type="button" className="btn" onClick={() => startEditProduct(product.id)}>
                            Изменить <span className="visually-hidden">{product.name}</span>
                        </button>
                    </td>
                    <td>
                        <button type="button" className="btn btn__danger" onClick={() => deleteProduct(product.id)}>
                            Удалить <span className="visually-hidden">{product.name}</span>
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default Product;
