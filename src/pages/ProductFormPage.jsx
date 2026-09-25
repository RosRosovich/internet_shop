import { useParams, useNavigate } from "react-router-dom";
import ProductAPI from "../services/productService";
import { ProductForm } from "../components/ProductForm";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useEscapeKey } from "../hooks/useEscapeKey";

export default function ProductFormPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = mode === "edit";
  const initial = isEdit ? ProductAPI.get(id) : undefined;

  useDocumentTitle(
    isEdit ? `Редактирование: ${initial?.name ?? ""}` : "Новый товар"
  );

  useEscapeKey(() => navigate(-1));

  const handleSubmit = (product) => {
    if (isEdit) {
      ProductAPI.update(product);
      navigate(`/product/${product.id}`);
    } else {
      const created = ProductAPI.add(product);
      navigate(`/product/${created.id}`);
    }
  };

  return (
    <section>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <h1>
        {isEdit ? `Редактирование: ${initial?.name ?? ""}` : "Новый товар"}
      </h1>
      <ProductForm
        initial={initial}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </section>
  );
}