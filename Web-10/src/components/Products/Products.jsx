import ProductsList from "./ProductsList";

const Products = () => {
  return (
    <main className="products-page">
      <h2>Все продукты</h2>
      <ProductsList showCart />
    </main>
  );
};

export default Products;
