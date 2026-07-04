import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import {loginApi} from "../../api/api";
import LoginForm from "./LoginForm";

const UserLoginForm = () => {
  const {setUser} = useContext(AppContext);
  const navigate = useNavigate();

  const userLogin = async (email, password) => {
    const found = await loginApi("users", email, password);
    if (!found) return null;
    setUser({...found, role: "user"});
    navigate("/client_office");
    return found;
  };

  return (
    <div>
      <LoginForm loginFn={userLogin} title="Вход для клиентов" />
      <p className="no-account-text">
        Нет аккаунта? <Link to="/client_register">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default UserLoginForm;
