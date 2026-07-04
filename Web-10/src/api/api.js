const API_URL = "http://localhost:3000";

export const fetchApi = async (path, method = "GET", body) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method,
    ...(body && {
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    }),
  });

  if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);
  if (method === "DELETE") return null;
  return res.json();
};

export const loginApi = async (table, email, password) => {
  const results = await fetchApi(`${table}?email=${encodeURIComponent(email)}`);
  if (!results.length) return null;
  const found = results[0];
  if (found.password !== password) return null;
  return found;
};

export const registerUserApi = async (name, email, password) => {
  const users = await fetchApi("users");
  const exists = users.some((user) => user.name === name || user.email === email);
  if (exists) {
    throw new Error("Пользователь с таким именем или email уже существует!");
  }

  return fetchApi("users", "POST", {name, email, password});
};

export const registerCompanyApi = async (name, email, password, description, imageUrl = "") => {
  const companies = await fetchApi("companies");
  const exists = companies.some((company) => company.name === name || company.email === email);
  if (exists) {
    throw new Error("Компания с таким именем или email уже существует!");
  }
  if (description.trim().length < 50) {
    throw new Error("Описание должно содержать не менее 50 символов!");
  }

  return fetchApi("companies", "POST", {name, email, password, description, imageUrl});
};

export const updateCompanyApi = async (companyId, updatedData) => {
  return fetchApi(`companies/${companyId}`, "PUT", updatedData);
};

export const addFeedbackApi = (companyId, text, rating, userId) => {
  return fetchApi("feedbacks", "POST", {
    companyId: Number(companyId),
    text,
    rating: Number(rating),
    userId: Number(userId),
    createdAt: new Date().toISOString(),
  });
};

export const getCartApi = (userId) => fetchApi(`carts?clientId=${userId}&_expand=product`);

export const addToCartApi = async (userId, productId) => {
  const product = await fetchApi(`products/${productId}`);
  const existing = await fetchApi(`carts?clientId=${userId}&productId=${productId}`);
  const amountInCart = existing.length ? existing[0].amount : 0;

  if (amountInCart + 1 > product.amount) {
    throw new Error(`Недостаточно товара на складе. В наличии: ${product.amount} шт`);
  }

  if (existing.length) {
    const item = existing[0];
    return fetchApi(`carts/${item.id}`, "PATCH", {amount: item.amount + 1});
  }
  return fetchApi("carts", "POST", {
    clientId: Number(userId),
    productId: Number(productId),
    amount: 1
  });
};

export const removeFromCartApi = (cartId) => fetchApi(`carts/${cartId}`, "DELETE");

export const updateCartItemApi = (cartId, data) => fetchApi(`carts/${cartId}`, "PUT", data);

export const decreaseStockApi = async (items) => {
  for (const item of items) {
    const product = await fetchApi(`products/${item.productId}`);
    const newAmount = product.amount - item.amount;
    if (newAmount < 0) {
      throw new Error(`Товар "${product.title}": на складе только ${product.amount} шт., а в заказе ${item.amount}`);
    }
    await fetchApi(`products/${item.productId}`, "PATCH", {amount: newAmount});
  }
};

export const placeOrderApi = (clientId, companyId, items, address) => {
  return fetchApi("orders", "POST", {
    clientId: Number(clientId),
    companyId: Number(companyId),
    items,
    status: "pending",
    address,
    createdAt: new Date().toISOString(),
  });
}

export const getOrdersApi = (clientId) => fetchApi(`orders?clientId=${clientId}`);

export const getCompanyOrdersApi = (companyId) => fetchApi(`orders?companyId=${companyId}`);

export const updateOrderStatusApi = (orderId, status) => fetchApi(`orders/${orderId}`, "PATCH", {status});

export const addProductApi = (title, cost, amount, companyId, imageUrl = "") => {
  return fetchApi("products", "POST", {
    title,
    cost: Number(cost),
    amount: Number(amount),
    companyId: Number(companyId),
    imageUrl,
  });
}

export const deleteProductApi = (productId) => fetchApi(`products/${productId}`, "DELETE");

export const updateProductApi = (productId, data) => fetchApi(`products/${productId}`, "PUT", data);