import { useState, useEffect } from "react";
import ProductAPI from "../service";

const formatPrice = (value) =>
  new Intl.NumberFormat("ru-BY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

function ProductDetail({ id, onBack }) {
  const [product, setProduct] = useState(() => ProductAPI.get(id));

  useEffect(() => {
    setProduct(ProductAPI.get(id));
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const prevTitle = document.title;
    document.title = `${product.name} — Каталог`;
    return () => {
      document.title = prevTitle;
    };
  }, [product]);

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