import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import {registerCompanyApi} from "../../api/api";

const CompanyRegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const newCompany = await registerCompanyApi(name, email, password, description, imageUrl);
      setUser({...newCompany, role: "company"});
      navigate("/company_office");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h2>Регистрация компании</h2>
        {error && <p className="error-msg">{error}</p>}
        <label>Название компании:</label>
        <input
          type="text" required value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Пароль:</label>
        <input
          type="password" required value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Описание (не менее 50 символов):</label>
        <textarea
          required value={description} rows={4}
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
        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      <p className="text-center">
        Уже есть аккаунт? <Link to="/company_login">Войти</Link>
      </p>
    </main>
  );
};

export default CompanyRegisterForm;