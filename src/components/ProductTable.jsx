import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";
import { Button } from "./Button";

export function ProductTable({ products, onDelete, onEdit }) {
  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Цена, BYN</th>
          <th>Категория</th>
          <th>Остаток</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr
            key={p.id}
            onDoubleClick={() => onEdit(p.id)}
            title="Двойной клик — редактировать"
          >
            <td>{p.id}</td>
            <td>
              <Link className="link" to={`/product/${p.id}`}>
                {p.name}
              </Link>
            </td>
            <td>{formatPrice(p.price)}</td>
            <td>{p.category}</td>
            <td>{p.stock}</td>
            <td>
              <Button
                variant="delete"
                onClick={(e) => handleDeleteClick(e, p.id)}
              >
                Удалить
              </Button>
            </td>
          </tr>
        ))}
        {products.length === 0 && (
          <tr>
            <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
              Товаров нет
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}