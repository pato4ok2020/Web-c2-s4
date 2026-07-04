import AddToCartButton from "./AddToCartButton";
import {formatMoney} from "../../utils/utils";
import CompanyLink from "../Companies/CompanyLink";

const Product = (props) => {
  const {product, showCart, editable, onEdit, onDelete} = props
  const {id, title, cost, amount, company, imageUrl} = product;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/150?text=No+Image";
  };

  return (
    <div className="product-card">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="product-image"
          onError={handleImageError}
        />
      )}
      <div className="product-info">
        <h4>{title}</h4>
        <p className="product-cost">{formatMoney(cost)} BYN</p>
        <p className="product-amount">В наличии: {amount} шт.</p>
        {company && (
          <p className="product-company">
            <CompanyLink company={company} />
          </p>
        )}
      </div>
      <div className="product-actions">
        {showCart && amount > 0 && <AddToCartButton productId={id} />}
        {editable && (
          <>
            <button className="edit-btn" onClick={() => onEdit && onEdit(product)}>
              ✏️
            </button>
            <button className="delete-btn" onClick={() => onDelete && onDelete(id)}>
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;