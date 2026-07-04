import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import Cart from "../Cart/Cart";
import UserOrders from "./UserOrders";
import {CartProvider} from "../../context/CartProvider";

const ClientOffice = () => {
  const {user} = useContext(AppContext);
  const navigate = useNavigate();

  if (!user?.id) {
    return (
      <main className="office-page">
        <h2>Личный кабинет клиента</h2>
        <p>
          Для доступа необходимо <Link to="/user_login">войти</Link> или{" "}
          <Link to="/client_register">зарегистрироваться</Link>
        </p>
      </main>
    );
  }

  if (user.role !== "user") {
    return (
      <main className="office-page">
        <h2>Доступ запрещён</h2>
        <p>
          Эта страница только для клиентов. <button onClick={() => navigate("/user_login")}>Войти как клиент</button>
        </p>
      </main>
    );
  }

  return (
    <main className="office-page">
      <h2>Личный кабинет: {user.name}</h2>
      <CartProvider>
        <Cart />
      </CartProvider>
      <hr />
      <UserOrders />
    </main>
  );
};

export default ClientOffice;

