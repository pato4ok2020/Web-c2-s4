export const calcCompanyRating = (feedbacks, companyId) => {
  let list = companyId ? feedbacks.filter((feedback) => feedback.companyId === Number(companyId)) : feedbacks;
  if (!list.length) return 0;
  return list.reduce((acc, feedback) => acc + feedback.rating, 0) / list.length;
};

export const formatDate = (iso) =>
  new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const STATUS_LABELS = {
  pending: "🕐 На рассмотрении",
  shipping: "🚚 В пути",
  delivered: "✅ Доставлен",
  cancelled: "❌ Отменён",
};

export const STATUS_ORDER = {
  pending: 0,
  shipping: 1,
  delivered: 2,
  cancelled: 3,
};

export const STATUS_VALUES = Object.keys(STATUS_ORDER);

const TERMINAL_STATUSES = new Set(["delivered", "cancelled"]);

export const getAllowedStatuses = (currentStatus) => {
  if (TERMINAL_STATUSES.has(currentStatus)) return [currentStatus];
  const currentOrder = STATUS_ORDER[currentStatus];
  return STATUS_VALUES.filter((status) => STATUS_ORDER[status] >= currentOrder);
};

export const formatMoney = (value) => (Math.round(value * 100) / 100).toFixed(2);

export const groupByCompany = (cartItems, companies = []) => {
  const groups = {};

  for (const cartItem of cartItems) {
    const companyId = cartItem.product.companyId;

    if (!groups[companyId]) {
      const fromProduct = cartItem.product.company;
      const fromList = companies.find((company) => company.id === companyId);
      const company = fromProduct
        ? {id: fromProduct.id, name: fromProduct.name}
        : fromList
          ? {id: fromList.id, name: fromList.name}
          : null;

      groups[companyId] = {company, name: company?.name ?? null, items: []};
    }

    groups[companyId].items.push(cartItem);
  }

  return groups;
};


