import {useNavigate} from "react-router-dom";
import CompanyRating from "./CompanyRating";

const CompanyCard = ({company}) => {
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
  };

  return (
    <div
      className="company-card"
      onClick={() => navigate(`/companies/${company.id}`)}
    >
      {company.imageUrl && (
        <img
          src={company.imageUrl}
          alt={company.name}
          className="company-logo"
          onError={handleImageError}
        />
      )}
      <h3>{company.name}</h3>
      <CompanyRating rating={company.rating} />
      <p className="company-desc">{company.description?.slice(0, 100)}...</p>
    </div>
  );
};

export default CompanyCard;