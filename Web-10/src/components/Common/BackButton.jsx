import {useNavigate} from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      Назад
    </button>
  );
};

export default BackButton;
