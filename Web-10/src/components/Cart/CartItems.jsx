import CartCompanyGroup from "./CartCompanyGroup";
import {CartContext} from "../../context/CartContext";
import {useContext} from "react";

const CartItems = () => {
  const {cartItemsGroupByCompany} = useContext(CartContext);

  return (
    <>
      {Object.entries(cartItemsGroupByCompany).map(([companyId, {
        company,
        name,
        items
      }]) => (
        <CartCompanyGroup key={companyId} companyId={companyId} company={company} companyName={name} items={items} />
      ))}
    </>
  );
};

export default CartItems;
