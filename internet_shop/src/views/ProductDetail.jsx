import ProductAPI from "../service";

const formatPrice = (value) =>
  new Intl.NumberFormat("ru-BY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

function ProductDetail({ id, onBack }) {
  const product = ProductAPI.get(id);

  if (!product) {
    return (
      <section>
        <p>Товар не найден</p>
        <button onClick={onBack}>← Назад</button>
      </section>
    );
  }

  return (
    <section>
      <button onClick={onBack}>← Назад к списку</button>
      <h1>{product.name}</h1>
      <ul className="detail-list">
        <li><b>ID:</b> {product.id}</li>
        <li><b>Цена:</b> {formatPrice(product.price)} BYN</li>
        <li><b>Категория:</b> {product.category}</li>
        <li><b>Остаток:</b> {product.stock} шт.</li>
      </ul>
    </section>
  );
}

export default ProductDetail;