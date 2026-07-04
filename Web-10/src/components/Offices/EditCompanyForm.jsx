import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {updateCompanyApi} from "../../api/api";

const EditCompanyForm = ({company, onClose, onUpdate}) => {
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);
  const [imageUrl, setImageUrl] = useState(company.imageUrl || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.trim().length < 50) {
      setError("Описание должно содержать не менее 50 символов!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const updatedCompany = {
        ...company,
        name,
        description,
        imageUrl,
      };
      await updateCompanyApi(company.id, updatedCompany);
      // Обновляем кеш запросов, чтобы изменения отобразились везде
      await queryClient.invalidateQueries({queryKey: ["companies"]});
      // Также обновляем данные в localStorage и контексте пользователя
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.id === company.id && user.role === "company") {
          const newUser = {...user, name, description, imageUrl};
          localStorage.setItem("user", JSON.stringify(newUser));
          // Вызываем колбэк для обновления состояния в AppContext
          if (onUpdate) onUpdate(newUser);
        }
      }
      onClose();
    } catch (err) {
      setError("Не удалось обновить профиль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h4>Редактировать профиль компании</h4>
      {error && <p className="error-msg">{error}</p>}
      <label>Название компании:</label>
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Описание (не менее 50 символов):</label>
      <textarea
        required
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <small>{description.length} / 50 мин.</small>
      <label>Ссылка на изображение (логотип):</label>
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://example.com/logo.png"
      />
      <div className="form-row">
        <button type="submit" disabled={loading}>
          {loading ? "Сохранение..." : "Сохранить"}
        </button>
        <button type="button" onClick={onClose}>
          Отмена
        </button>
      </div>
    </form>
  );
};

export default EditCompanyForm;