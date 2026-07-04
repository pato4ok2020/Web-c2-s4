import FeedbacksList from "./FeedbacksList";
import AddFeedbackForm from "./AddFeedbackForm";

const Feedbacks = ({feedbacks, companyId}) => {
  return (
    <div className="feedbacks-section">
      <h3>Отзывы ({feedbacks.length})</h3>
      <AddFeedbackForm companyId={companyId} />
      <FeedbacksList feedbacks={feedbacks} />
    </div>
  );
};

export default Feedbacks;
