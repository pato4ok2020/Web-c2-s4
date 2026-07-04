import {useState} from "react";
import {addProductApi} from "../../api/api";
import {useQueryClient} from "@tanstack/react-query";

const AddProductForm = ({companyId, onClose}) => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const [amount, setAmount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !cost || !amount) return;
    setLoading(true);
    setError("");
    try {
      await addProductApi(title.trim(), cost, amount, companyId, imageUrl);
      await queryClient.invalidateQueries({queryKey: [`products_company${companyId}`]});
      setTitle("");
      setCost("");
      setAmount("");
      setImageUrl("");
      onClose && onClose();
    } catch (e) {
      setError("Не удалось добавить продукт: " + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="add-product-form"
      onSubmit={handleSubmit}
    >
      <h4>Добавить продукт</h4>
      {error && <p className="error-msg">{error}</p>}
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
        >{loading ? "Добавление..." : "Добавить"}</button>
        {onClose && <button
          type="button"
          onClick={onClose}
        >Отмена</button>}
      </div>
    </form>
  );
};

export default AddProductForm;