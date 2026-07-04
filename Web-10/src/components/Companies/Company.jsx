import {useParams} from "react-router-dom";
import {calcCompanyRating} from "../../utils/utils";
import CompanyRating from "./CompanyRating";
import Feedbacks from "../Feedbacks/Feedbacks";
import ProductsList from "../Products/ProductsList";
import {useContext} from "react";
import {CompanyContext} from "../../context/CompanyContext";

const Company = () => {
  let {id: companyId} = useParams();
  companyId = Number(companyId);

  const {
    loadingCompanies,
    errorCompanies,
    feedbacks,
    companies,
    loadingFeedbacks
  } = useContext(CompanyContext);

  if (loadingCompanies) {
    return (
      <main>
        <h2>Загрузка...</h2>
      </main>
    );
  }

  if (errorCompanies) {
    return (
      <main>
        <h2>Не удалось получить список компаний</h2>
      </main>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <main>
        <h2>Компаний пока нет</h2>
      </main>
    );
  }

  const company = companies.find((company) => company.id === companyId);
  if (!company) {
    return (
      <main>
        <h2>Компания не найдена</h2>
      </main>
    );
  }

  const companyFeedbacks = feedbacks ? feedbacks.filter((feedback) => feedback.companyId === companyId) : [];
  const rating = feedbacks ? calcCompanyRating(feedbacks, companyId) : undefined;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/1200x400?text=Company+Banner";
  };

  return (
    <main className="company-page">
      {company.imageUrl && (
        <img
          src={company.imageUrl}
          alt={company.name}
          className="company-banner"
          onError={handleImageError}
        />
      )}
      <h2>{company.name}</h2>
      <CompanyRating rating={rating} />
      <p className="company-desc">{company.description}</p>

      <section className="company-products">
        <h3>Меню</h3>
        <ProductsList companyId={companyId} showCart />
      </section>

      <section>
        {loadingFeedbacks ? (
          <p>Загрузка отзывов...</p>
        ) : (
          <Feedbacks feedbacks={companyFeedbacks} companyId={companyId} />
        )}
      </section>
    </main>
  );
};

export default Company;