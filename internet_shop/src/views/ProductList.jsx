const formatPrice = (value) =>
  new Intl.NumberFormat("ru-BY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  
  function ProductList({ products, onSelect, onAdd, onDelete, onEdit }) {
  const handleRowDoubleClick = (id) => {
    onEdit(id);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation(); 
    if (window.confirm("Удалить товар?")) {
      onDelete(id);
    }
  };

  return (
    <section>
      <div className="list-header">
        <h1>Каталог товаров</h1>
        <button className="btn-primary" onClick={onAdd}>
          + Добавить товар
        </button>
      </div>

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
              onDoubleClick={() => handleRowDoubleClick(p.id)}
              title="Двойной клик — редактировать"
            >
              <td>{p.id}</td>
              <td>
                <button className="link" onClick={() => onSelect(p.id)}>
                  {p.name}
                </button>
              </td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  className="btn-delete"
                  onClick={(e) => handleDeleteClick(e, p.id)}
                >
                  Удалить
                </button>
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
    </section>
  );
}

export default ProductList;