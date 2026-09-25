import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductAPI from "../services/productService";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { formatPrice } from "../utils/format";
import { Button } from "../components/Button";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(() => ProductAPI.get(id));

  useEffect(() => {
    setProduct(ProductAPI.get(id));
  }, [id]);

  useDocumentTitle(product ? `${product.name} — Каталог` : "Товар не найден");

  useEscapeKey(() => navigate(-1));

  if (!product) {
    return (
      <section>
        <p>Товар не найден</p>
        <Button onClick={() => navigate("/")}>← Назад</Button>
      </section>
    );
  }

  return (
    <section>
      <button onClick={() => navigate(-1)}>← Назад</button>
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