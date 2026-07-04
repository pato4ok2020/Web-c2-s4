import {CartContext} from "../../context/CartContext";
import {useContext} from "react";
import {formatMoney} from "../../utils/utils";

const CartSubtotal = ({subtotal, companyName, companyId, orderOnClick}) => {
  const {orderingCompanyId} = useContext(CartContext);

  const isOrdering = orderingCompanyId === Number(companyId);
  const anyOrdering = orderingCompanyId !== null;

  return (
    <div className="cart-subtotal">
      <strong>
        Итого от {companyName}: {formatMoney(subtotal)} BYN
      </strong>
      <button className="order-btn" onClick={orderOnClick} disabled={anyOrdering}>
        {isOrdering ? "Оформление..." : "Оформить заказ"}
      </button>
    </div>
  );
};

export default CartSubtotal;
