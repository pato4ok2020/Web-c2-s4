import {useContext, useState} from "react";
import {CartContext} from "./CartContext";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {AppContext} from "./AppContext";
import {
  decreaseStockApi,
  fetchApi,
  getCartApi,
  placeOrderApi,
  removeFromCartApi,
  updateCartItemApi,
} from "../api/api";
import {groupByCompany} from "../utils/utils";

export const CartProvider = ({children}) => {
  const [address, setAddress] = useState("");
  const [orderingCompanyId, setOrderingCompanyId] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");
  const {user} = useContext(AppContext);
  const queryClient = useQueryClient();

  const {data: cartItems, isLoading: isLoadingCart} = useQuery({
    queryKey: [`cart${user.id}`],
    queryFn: () => getCartApi(user.id),
    enabled: Boolean(user?.id),
  });

  const {data: companies, isLoading: isLoadingCompanies} = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchApi("companies"),
    enabled: Boolean(user?.id),
  });

  const isLoading = isLoadingCart || isLoadingCompanies;
  const cartItemsGroupByCompany = cartItems && companies ? groupByCompany(cartItems, companies) : {};

  const totalCost = cartItems
    ? cartItems.reduce((acc, cartItem) => acc + cartItem.product.cost * cartItem.amount, 0)
    : 0;

  const updateAmount = async (cartItem, delta) => {
    const newAmount = cartItem.amount + delta;
    if (newAmount <= 0) {
      await removeFromCartApi(cartItem.id);
    } else {
      if (delta > 0 && newAmount > cartItem.product.amount) {
        setOrderError(`Нельзя добавить больше — на складе только ${cartItem.product.amount} шт.`);
        return;
      }
      setOrderError("");
      await updateCartItemApi(cartItem.id, {...cartItem, amount: newAmount});
    }
    await queryClient.invalidateQueries({queryKey: [`cart${user.id}`]});
  };

  const removeItem = async (cartId) => {
    await removeFromCartApi(cartId);
    await queryClient.invalidateQueries({queryKey: [`cart${user.id}`]});
  };

  const placeOrder = async (companyId, items) => {
    if (!address.trim()) {
      setOrderError("Укажите адрес доставки!");
      return;
    }

    for (const item of items) {
      if (item.amount > item.product.amount) {
        setOrderError(
          `Товар "${item.product.title}": в корзине ${item.amount} шт., а на складе только ${item.product.amount} шт.`,
        );
        return;
      }
    }

    setOrderingCompanyId(companyId);
    setOrderError("");

    try {
      const orderItems = items.map((item) => ({
        productId: item.productId,
        amount: item.amount,
        priceAtOrder: item.product.cost,
      }));
      await placeOrderApi(user.id, companyId, orderItems, address);
      await decreaseStockApi(orderItems);
      for (const item of items) await removeFromCartApi(item.id);
      await queryClient.invalidateQueries({queryKey: [`cart${user.id}`]});
      await queryClient.invalidateQueries({queryKey: [`orders_user${user.id}`]});
      await queryClient.invalidateQueries({queryKey: ["products_all"]});
      await queryClient.invalidateQueries({queryKey: [`products_company${companyId}`]});
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 3000);
    } catch (err) {
      setOrderError(err.message || "Ошибка оформления заказа");
    } finally {
      setOrderingCompanyId(null);
    }
  };

  return (
    <CartContext.Provider
      value={{
        user,
        isLoading,
        cartItems,
        cartItemsGroupByCompany,
        totalCost,
        address,
        setAddress,
        orderingCompanyId,
        orderSuccess,
        orderError,
        updateAmount,
        removeItem,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
