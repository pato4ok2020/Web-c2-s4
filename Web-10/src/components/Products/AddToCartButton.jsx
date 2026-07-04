import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {addToCartApi} from "../../api/api";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

const AddToCartButton = ({productId}) => {
  const {user} = useContext(AppContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!user?.id || user.role !== "user") {
      navigate("/user_login");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addToCartApi(user.id, productId);
      await queryClient.invalidateQueries({queryKey: [`cart${user.id}`]});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="add-to-cart-btn" onClick={handleClick} disabled={loading}>
        {loading ? "..." : "🛒 В корзину"}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddToCartButton;
