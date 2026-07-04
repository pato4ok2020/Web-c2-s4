import {useState} from "react";

const LoginForm = (props) => {
  const {loginFn, title} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await loginFn(email, password);
      if (!result) setError("Неверный email или пароль!");
    } catch (err) {
      setError(err.message || "Ошибка входа");
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
        <h2>{title}</h2>
        {error && <p className="error-msg">{error}</p>}
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
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Входим..." : "Войти"}
        </button>
      </form>
    </main>
  );
};

export default LoginForm;

