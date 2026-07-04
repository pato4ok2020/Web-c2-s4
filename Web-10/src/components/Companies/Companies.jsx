import {useContext} from "react";
import {calcCompanyRating} from "../../utils/utils";
import CompanyCard from "./CompanyCard";
import {CompanyContext} from "../../context/CompanyContext";

const Companies = () => {
  const {
    loadingCompanies,
    errorCompanies,
    companies,
    feedbacks
  } = useContext(CompanyContext);

  if (loadingCompanies) {
    return (
      <main>
        <h2>Загрузка компаний...</h2>
      </main>
    );
  }

  if (errorCompanies) {
    return (
      <main>
        <h2>Ошибка загрузки компаний</h2>
      </main>
    );
  }

  if (!companies?.length) {
    return (
      <main>
        <h2>Компаний пока нет</h2>
      </main>
    );
  }

  const withRatings = companies.map((company) => ({
    ...company,
    rating: feedbacks ? calcCompanyRating(feedbacks, company.id) : 0,
  }));

  if (feedbacks) withRatings.sort((left, right) => right.rating - left.rating);

  return (
    <main className="companies-page">
      <h2>Компании</h2>
      <ul className="companies-list">
        {withRatings.map((company) => (
          <li key={company.id}>
            <CompanyCard company={company} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Companies;

