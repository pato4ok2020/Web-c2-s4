import {useContext} from "react";
import {CartContext} from "../../context/CartContext";
import AddressInput from "./AddressInput";
import CartItems from "./CartItems";
import TotalCost from "./TotalCost";

const Cart = () => {
  const {
    user,
    isLoading,
    cartItems,
    orderError,
    orderSuccess,
    totalCost
  } = useContext(CartContext);

  if (!user?.id) return <p>Войдите как клиент</p>;
  if (isLoading) return <p>Загрузка корзины...</p>;
  if (!cartItems?.length) return <p>Корзина пуста</p>;

  return (
    <div className="cart-section">
      <h3>Корзина</h3>
      {orderSuccess && <p className="success-msg">Заказ оформлен!</p>}
      {orderError && <p className="error-msg">{orderError}</p>}
      <AddressInput />
      <CartItems />
      <TotalCost totalCost={totalCost} />
    </div>
  );
};

export default Cart;

