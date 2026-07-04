import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import {registerUserApi} from "../../api/api";

const UserRegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const newUser = await registerUserApi(name, email, password);
      setUser({...newUser, role: "user"});
      navigate("/client_office");
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
        <h2>Регистрация клиента</h2>
        {error && <p className="error-msg">{error}</p>}
        <label>Имя:</label>
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
        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      <p className="text-center">
        Уже есть аккаунт? <Link to="/user_login">Войти</Link>
      </p>
    </main>
  );
};

export default UserRegisterForm;
