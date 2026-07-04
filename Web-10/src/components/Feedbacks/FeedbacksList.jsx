import Feedback from "./Feedback";

const FeedbacksList = (props) => {
  const {feedbacks} = props;

  if (feedbacks.length === 0) {
    return <p>Отзывов пока нет</p>;
  } else {
    return (
      <ul className="feedbacks-list">
        {feedbacks.map((fb) => (
          <li key={fb.id}>
            <Feedback feedback={fb} />
          </li>
        ))}
      </ul>
    );
  }
};

export default FeedbacksList;
