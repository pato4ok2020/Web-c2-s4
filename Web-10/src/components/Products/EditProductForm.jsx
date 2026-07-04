import {useState} from "react";
import {updateProductApi} from "../../api/api";
import {useQueryClient} from "@tanstack/react-query";

const EditProductForm = (props) => {
  const {product, companyId, onClose} = props
  const [title, setTitle] = useState(product.title);
  const [cost, setCost] = useState(product.cost);
  const [amount, setAmount] = useState(product.amount);
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProductApi(product.id, {
        ...product,
        title,
        cost: Number(cost),
        amount: Number(amount),
        imageUrl,
      });
      await queryClient.invalidateQueries({queryKey: [`products_company${companyId}`]});
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h4>Редактировать продукт</h4>
      <label>Название:</label>
      <input
        type="text" required value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Цена (BYN):</label>
      <input
        type="number" required min="0" step="0.01" value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <label>Количество:</label>
      <input
        type="number" required min="0" value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label>Ссылка на изображение товара:</label>
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://example.com/food.jpg"
      />
      <div className="form-row">
        <button
          type="submit"
          disabled={loading}
        >{loading ? "Сохранение..." : "Сохранить"}</button>
        <button
          type="button"
          onClick={onClose}
        >Отмена
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;