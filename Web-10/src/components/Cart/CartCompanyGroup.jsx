import CartSubtotal from "./CartSubtotal";
import CartItem from "./CartItem";
import {CartContext} from "../../context/CartContext";
import {useContext} from "react";
import CompanyLink from "../Companies/CompanyLink";

const CartCompanyGroup = (props) => {
  const {companyId, company, companyName, items} = props;
  const {placeOrder} = useContext(CartContext);

  const subtotal = items.reduce((acc, cartItem) => acc + cartItem.product.cost * cartItem.amount, 0);

  return (
    <div className="cart-company-group">
      <h4>{company ? <CompanyLink company={company} /> : companyName || `Компания #${companyId}`}</h4>
      <ul className="cart-items">
        {items.map((item) => (
          <li
            key={item.id}
            className="cart-item"
          >
            <CartItem item={item} />
          </li>
        ))}
      </ul>
      <CartSubtotal
        subtotal={subtotal} companyName={companyName || `Компания #${companyId}`}
        companyId={companyId} orderOnClick={() => placeOrder(Number(companyId), items)}
      />
    </div>
  );
};

export default CartCompanyGroup;
