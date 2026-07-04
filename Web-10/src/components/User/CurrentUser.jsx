import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";

const CurrentUser = () => {
  const {user, setUser} = useContext(AppContext);
  const navigate = useNavigate();

  if (!user?.id) return null;

  const logout = () => {
    setUser({});
    navigate("/");
  };

  return (
    <div className="current-user">
      <span>
        <strong>{user.name} </strong>
        <em>({user.role === "company" ? "Компания" : "Клиент"})</em>
      </span>
      <button onClick={logout}>Выйти</button>
    </div>
  );
};

export default CurrentUser;

