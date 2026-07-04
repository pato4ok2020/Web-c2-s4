import {useQuery} from "@tanstack/react-query";
import {fetchApi} from "../../api/api";
import Product from "./Product";

const ProductsList = (props) => {
  const {companyId, showCart, editable, onEdit, onDelete} = props

  const {data: products, isLoading, error} = useQuery({
      queryKey: companyId ? [`products_company${companyId}`] : ["products_all"],
      queryFn: companyId
        ? () => fetchApi(`products?companyId=${companyId}`)
        : () => fetchApi("products?_expand=company")
    }
  );

  if (isLoading) return <p>Загрузка продуктов...</p>;
  if (error) return <p>Не удалось загрузить продукты</p>;
  if (!products?.length) return <p>Продуктов пока нет</p>;

  return (
    <ul className="products-list">
      {products.map((product) => (
        <li key={product.id}>
          <Product product={product} showCart={showCart} editable={editable} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
