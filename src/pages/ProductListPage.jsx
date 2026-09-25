import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductAPI from "../services/productService";
import { Button } from "../components/Button";
import { ProductGrid } from "../components/ProductGrid";
import { ProductTable } from "../components/ProductTable";
import { ViewSwitcher, useCatalogView } from "../components/ViewSwitcher";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function ProductListPage() {
  const [products, setProducts] = useState(() => ProductAPI.all());
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const navigate = useNavigate();
  const view = useCatalogView();

  useDocumentTitle(`Каталог товаров (${products.length})`);

  useEffect(() => {
    const refresh = () => setProducts([...ProductAPI.all()]);
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);

  const askDelete = (id) => setPendingDeleteId(id);

  const confirmDelete = () => {
    if (pendingDeleteId !== null) {
      ProductAPI.delete(pendingDeleteId);
      setProducts([...ProductAPI.all()]);
    }
    setPendingDeleteId(null);
  };

  const cancelDelete = () => setPendingDeleteId(null);

  return (
    <section>
      <div className="list-header">
        <h1>Каталог товаров</h1>
        <div className="list-controls">
          <ViewSwitcher />
          <Button variant="primary" onClick={() => navigate("/new")}>
            + Добавить товар
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <ProductGrid
          products={products}
          onEdit={(id) => navigate(`/product/${id}/edit`)}
          onDelete={askDelete}
        />
      ) : (
        <ProductTable
          products={products}
          onDelete={askDelete}
          onEdit={(id) => navigate(`/product/${id}/edit`)}
        />
      )}

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Подтвердите действие"
        message="Удалить товар?"
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </section>
  );
}