import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const AddProductForm = () => {
    const {
        newProductName,
        newProductPrice,
        newProductAmount,
        setNewProductName,
        setNewProductPrice,
        setNewProductAmount,
        addProduct,
    } = useContext(ProductsContext);

    return (
        <form>
            <h2 className="label-wrapper">
                <label htmlFor="new-name-input" className="label__lg">
                    Какой продукт добавить?
                </label>
            </h2>
            <input
                type="text"
                id="new-name-input"
                className="input input__lg"
                name="name"
                autoComplete="off"
                value={newProductName}
                onInput={({ target }) => setNewProductName(target.value)}
            />
            <h2 className="label-wrapper">
                <label htmlFor="new-price-input" className="label__lg">
                    Какая у него стоимость за единицу?
                </label>
            </h2>
            <input
                type="number"
                id="new-price-input"
                className="input input__lg"
                name="price"
                autoComplete="off"
                value={newProductPrice}
                onInput={({ target }) => setNewProductPrice(target.value)}
            />
            <h2 className="label-wrapper">
                <label htmlFor="new-amount-input" className="label__lg">
                    Какое количество продукта?
                </label>
            </h2>
            <input
                type="number"
                id="new-amount-input"
                className="input input__lg"
                name="amount"
                autoComplete="off"
                value={newProductAmount}
                onInput={({ target }) => setNewProductAmount(target.value)}
            />
            <button type="submit" className="btn btn__primary btn__lg" onClick={addProduct}>
                Добавить
            </button>
        </form>
    );
};

export default AddProductForm;
