import {CartContext} from "../../context/CartContext";
import {useContext} from "react";
import {formatMoney} from "../../utils/utils";

const CartItem = (props) => {
  const {item} = props
  const {updateAmount, removeItem} = useContext(CartContext);

  return (
    <>
      <span className="cart-item-name">{item.product.title}</span>
      <span className="cart-item-price">{formatMoney(item.product.cost)} BYN × </span>
      <div className="cart-qty">
        <button onClick={() => updateAmount(item, -1)}>−</button>
        <span>{item.amount}</span>
        <button onClick={() => updateAmount(item, 1)}>+</button>
      </div>
      <span className="cart-item-total">{formatMoney(item.product.cost * item.amount)} BYN</span>
      <button className="remove-btn" onClick={() => removeItem(item.id)}>
        ✕
      </button>
    </>
  );
};

export default CartItem;
