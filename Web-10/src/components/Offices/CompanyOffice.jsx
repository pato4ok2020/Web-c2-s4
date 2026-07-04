import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import {useQueryClient} from "@tanstack/react-query";
import {deleteProductApi} from "../../api/api";
import ProductsList from "../Products/ProductsList";
import AddProductForm from "../Products/AddProductForm";
import EditProductForm from "../Products/EditProductForm";
import CompanyOrders from "./CompanyOrders";
import EditCompanyForm from "./EditCompanyForm";

const CompanyOffice = () => {
  const {user, setUser} = useContext(AppContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditCompanyForm, setShowEditCompanyForm] = useState(false);

  if (!user?.id) {
    return (
      <main className="office-page">
        <h2>Панель компании</h2>
        <p>Для доступа необходимо <Link to="/company_login">войти</Link> или <Link
          to="/company_register"
        >зарегистрироваться</Link>
        </p>
      </main>
    );
  }

  if (user.role !== "company") {
    return (
      <main className="office-page">
        <h2>Доступ запрещён</h2>
        <p>Эта страница только для компаний. <button
          onClick={() => navigate("/company_login")}
        >Войти как компания</button>
        </p>
      </main>
    );
  }

  const handleDelete = async (productId) => {
    if (!confirm("Удалить продукт?")) return;
    await deleteProductApi(productId);
    await queryClient.invalidateQueries({queryKey: [`products_company${user.id}`]});
  };

  const handleCompanyUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <main className="office-page">
      <div className="office-header">
        <h2>Панель управления: {user.name}</h2>
        <button
          className="edit-profile-btn"
          onClick={() => setShowEditCompanyForm(!showEditCompanyForm)}
        >
          {showEditCompanyForm ? "Скрыть" : "✎ Редактировать профиль"}
        </button>
      </div>

      {showEditCompanyForm && (
        <EditCompanyForm
          company={user}
          onClose={() => setShowEditCompanyForm(false)}
          onUpdate={handleCompanyUpdate}
        />
      )}

      <section className="office-section">
        <div className="section-header">
          <h3>Мои продукты</h3>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingProduct(null);
            }}
          >
            {showAddForm ? "Скрыть" : "+ Добавить продукт"}
          </button>
        </div>

        {showAddForm && (
          <AddProductForm companyId={user.id} onClose={() => setShowAddForm(false)} />
        )}

        {editingProduct && (
          <EditProductForm
            product={editingProduct} companyId={user.id}
            onClose={() => setEditingProduct(null)}
          />
        )}

        <ProductsList
          companyId={user.id} editable
          onEdit={(p) => {
            setEditingProduct(p);
            setShowAddForm(false);
          }}
          onDelete={handleDelete}
        />
      </section>

      <hr />

      <section className="office-section">
        <CompanyOrders />
      </section>
    </main>
  );
};

export default CompanyOffice;