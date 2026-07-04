import {formatDate} from "../../utils/utils";

const Feedback = ({feedback}) => {
  const {text, rating, user, createdAt} = feedback;
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <div className="feedback">
      <div className="feedback-header">
        <strong>{user?.name || "Аноним"}</strong>
        <span className="stars">{stars}</span>
        <span className="feedback-date">{formatDate(createdAt)}</span>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Feedback;
