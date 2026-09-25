import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/format";

export function ProductCard({ product, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(product.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  return (
    <article
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-card__actions">
        <button
          type="button"
          className="product-card__action product-card__action--edit"
          title="Редактировать"
          onClick={handleEdit}
        >
          ✎
        </button>
        <button
          type="button"
          className="product-card__action product-card__action--delete"
          title="Удалить"
          onClick={handleDelete}
        >
          ✕
        </button>
      </div>

      <div className="product-card__image">
        <span>{product.name[0]}</span>
      </div>
      <div className="product-card__name">{product.name}</div>
      <div className="product-card__price">
        {formatPrice(product.price)} BYN
      </div>
      <div className="product-card__meta">
        {product.category} · {product.stock} шт.
      </div>
    </article>
  );
}