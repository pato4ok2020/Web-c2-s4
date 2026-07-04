import {useQuery} from "@tanstack/react-query";
import {CompanyContext} from "./CompanyContext";
import {fetchApi} from "../api/api";

export const CompanyProvider = ({children}) => {
  const {
    data: companies,
    isLoading: loadingCompanies,
    error: errorCompanies,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchApi("companies"),
  });

  const {
    data: feedbacks,
    isLoading: loadingFeedbacks,
    error: errorFeedbacks,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => fetchApi("feedbacks?_expand=user"),
  });

  return (
    <CompanyContext.Provider
      value={{
        companies,
        loadingCompanies,
        errorCompanies,
        feedbacks,
        loadingFeedbacks,
        errorFeedbacks,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
