import {BrowserRouter, Link, NavLink, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppProvider} from "./context/AppProvider";
import {CompanyProvider} from "./context/CompanyProvider";
import CurrentUser from "./components/User/CurrentUser";
import BackButton from "./components/Common/BackButton";

import Companies from "./components/Companies/Companies";
import Company from "./components/Companies/Company";
import Products from "./components/Products/Products";
import CompanyLoginForm from "./components/Auth/CompanyLoginForm";
import UserLoginForm from "./components/Auth/UserLoginForm";
import CompanyRegisterForm from "./components/Auth/CompanyRegisterForm";
import UserRegisterForm from "./components/Auth/UserRegisterForm";
import CompanyOffice from "./components/Offices/CompanyOffice";
import ClientOffice from "./components/Offices/UserOffice";

const queryClient = new QueryClient({
  defaultOptions: {queries: {staleTime: 30_000}},
});

const NavBar = () => (
  <nav className="main-nav">
    <NavLink to="/companies">Компании</NavLink>
    <NavLink to="/products">Продукты</NavLink>
    <NavLink to="/company_office">Панель компании</NavLink>
    <NavLink to="/client_office">Личный кабинет</NavLink>
    <span className="nav-auth">
      <NavLink to="/company_login">Вход (компания)</NavLink>
      <NavLink to="/user_login">Вход (клиент)</NavLink>
    </span>
  </nav>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <CompanyProvider>
        <BrowserRouter>
          <header className="main-header">
            <Link to="/" className="logo">
              Доставка еды
            </Link>
            <CurrentUser />
          </header>
          <NavBar />
          <div className="back-button-wrap">
            <BackButton />
          </div>
          <Routes>
            <Route path="/" element={<Companies />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<Company />} />
            <Route path="/products" element={<Products />} />
            <Route path="/company_login" element={<CompanyLoginForm />} />
            <Route path="/user_login" element={<UserLoginForm />} />
            <Route path="/company_register" element={<CompanyRegisterForm />} />
            <Route path="/client_register" element={<UserRegisterForm />} />
            <Route path="/company_office" element={<CompanyOffice />} />
            <Route path="/client_office" element={<ClientOffice />} />
          </Routes>
        </BrowserRouter>
      </CompanyProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
