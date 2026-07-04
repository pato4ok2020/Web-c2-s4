import {useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {AppContext} from "../../context/AppContext";
import {fetchApi, getOrdersApi} from "../../api/api";
import {formatDate, formatMoney, STATUS_LABELS} from "../../utils/utils";
import CompanyLink from "../Companies/CompanyLink";

const UserOrders = () => {
  const {user} = useContext(AppContext);

  const {data: orders, isLoading} = useQuery({
    queryKey: [`orders_user${user.id}`],
    queryFn: () => getOrdersApi(user.id),
    enabled: !!user?.id,
  });

  const {data: allProducts} = useQuery({
    queryKey: ["products_all"],
    queryFn: () => fetchApi("products?_expand=company"),
  });

  const {data: companies} = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchApi("companies"),
  });

  if (isLoading) return <p>Загрузка заказов...</p>;
  if (!orders?.length) return <p>Заказов пока нет</p>;

  const getProduct = (productId) => allProducts?.find((product) => product.id === productId);
  const getCompany = (companyId) => companies?.find((company) => company.id === companyId);

  return (
    <div className="orders-section">
      <h3>Мои заказы</h3>
      <ul className="orders-list">
        {[...orders].reverse().map((order) => {
          const company = getCompany(order.companyId);
          const orderTotal = order.items.reduce((acc, item) => acc + item.priceAtOrder * item.amount, 0);
          return (
            <li key={order.id} className="order-card">
              <div className="order-header">
                <span>
                  <strong>Заказ #{order.id}</strong>
                </span>
                <span className={`order-status status-${order.status}`}>
                  {STATUS_LABELS[order.status] || order.status}
                </span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              {company && (
                <p>
                  <CompanyLink company={company} />
                </p>
              )}
              <p>{order.address}</p>
              <ul className="order-items">
                {order.items.map((item, index) => {
                  const product = getProduct(item.productId);
                  return (
                    <li key={index}>
                      {product?.title || `#${item.productId}`} × {item.amount} ={" "}
                      {formatMoney(item.priceAtOrder * item.amount)} BYN
                    </li>
                  );
                })}
              </ul>
              <p className="order-total">
                <strong>Итого: {formatMoney(orderTotal)} BYN</strong>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserOrders;
