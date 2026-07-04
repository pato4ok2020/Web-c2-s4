import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import {loginApi} from "../../api/api";
import LoginForm from "./LoginForm";

const CompanyLoginForm = () => {
  const {setUser} = useContext(AppContext);
  const navigate = useNavigate();

  const companyLogin = async (email, password) => {
    const found = await loginApi("companies", email, password);
    if (!found) return null;
    setUser({...found, role: "company"});
    navigate("/company_office");
    return found;
  };

  return (
    <div>
      <LoginForm loginFn={companyLogin} title="Вход для компаний" />
      <p className="no-account-text">
        Нет аккаунта? <Link to="/company_register">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default CompanyLoginForm;
