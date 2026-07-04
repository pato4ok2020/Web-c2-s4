import {Link} from "react-router-dom";

const CompanyLink = (props) => {
  const {company} = props;
  return <Link to={`/companies/${company.id}`}>{company.name}</Link>;
};

export default CompanyLink;
