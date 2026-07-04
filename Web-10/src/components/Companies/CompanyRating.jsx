const CompanyRating = (props) => {
  const {rating} = props;
  if (!rating && rating !== 0) return <p className="rating">Нет оценок</p>;
  const rounded = Math.round(rating * 10) / 10;
  const filledStars = Math.round(rating);
  const stars = "★".repeat(filledStars) + "☆".repeat(5 - filledStars);
  return (
    <p className="rating">
      <span className="stars">{stars}</span> {rounded.toFixed(1)} / 5
    </p>
  );
};

export default CompanyRating;

