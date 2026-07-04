import {useContext} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AppContext} from "../../context/AppContext";
import {fetchApi, getCompanyOrdersApi, updateOrderStatusApi} from "../../api/api";
import {formatDate, formatMoney, getAllowedStatuses, STATUS_LABELS} from "../../utils/utils";

const CompanyOrders = () => {
  const {user} = useContext(AppContext);
  const queryClient = useQueryClient();

  const {data: orders, isLoading} = useQuery({
    queryKey: [`orders_company${user.id}`],
    queryFn: () => getCompanyOrdersApi(user.id),
    enabled: !!user?.id,
  });

  const {data: allProducts} = useQuery({
    queryKey: [`products_company${user.id}`],
    queryFn: () => fetchApi(`products?companyId=${user.id}`),
    enabled: !!user?.id,
  });

  const changeStatus = async (orderId, status) => {
    await updateOrderStatusApi(orderId, status);
    await queryClient.invalidateQueries({queryKey: [`orders_company${user.id}`]});
  };

  if (isLoading) return <p>Загрузка заказов...</p>;
  if (!orders?.length) return <p>Заказов пока нет</p>;

  const getProduct = (productId) => allProducts?.find((product) => product.id === productId);

  return (
    <div className="orders-section">
      <h3>Заказы компании</h3>
      <ul className="orders-list">
        {[...orders].reverse().map((order) => {
          const orderTotal = order.items.reduce((acc, item) => acc + item.priceAtOrder * item.amount, 0);
          const allowedStatuses = getAllowedStatuses(order.status);

          return (
            <li key={order.id} className="order-card">
              <div className="order-header">
                <strong>Заказ #{order.id}</strong>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <p>📍 {order.address}</p>
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
              <div className="status-control">
                <label>Статус:</label>
                <select
                  value={order.status} disabled={allowedStatuses.length === 1}
                  onChange={(event) => changeStatus(order.id, event.target.value)}
                >
                  {allowedStatuses.map((statusKey) => (
                    <option key={statusKey} value={statusKey}>
                      {STATUS_LABELS[statusKey] || statusKey}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CompanyOrders;
