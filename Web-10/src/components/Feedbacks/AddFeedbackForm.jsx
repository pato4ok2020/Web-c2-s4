import {useContext, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import {addFeedbackApi} from "../../api/api";

const AddFeedbackForm = (props) => {
  const {companyId} = props;
  const {user} = useContext(AppContext);
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [rating, setRating] = useState("5");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (!user?.id || user.role !== "user") {
    return (
      <p>
        <Link to="/user_login">Войдите как клиент</Link>, чтобы оставить отзыв
      </p>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    setError("");
    try {
      await addFeedbackApi(companyId, text, rating, user.id);
      setText("");
      setRating("5");
      await queryClient.invalidateQueries({queryKey: [`feedbacks${companyId}`]});
      await queryClient.invalidateQueries({queryKey: ["feedbacks"]});
    } catch {
      setError("Не удалось отправить отзыв");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h4>Оставить отзыв</h4>
      {error && <p className="error-msg">{error}</p>}
      <label>Оценка:</label>
      <select
        value={rating}
        onChange={(event) => setRating(event.target.value)}
      >
        {[1, 2, 3, 4, 5].map((number) => (
          <option
            key={number}
            value={number}
          >
            {number} {"★".repeat(number)}
          </option>
        ))}
      </select>
      <label>Текст отзыва:</label>
      <textarea
        required rows={3} value={text} placeholder="Поделитесь впечатлениями..."
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit" disabled={sending}>
        {sending ? "Отправка..." : "Отправить отзыв"}
      </button>
    </form>
  );
};

export default AddFeedbackForm;
