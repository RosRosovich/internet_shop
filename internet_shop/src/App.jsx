import { useState, useEffect } from "react";
import ProductList from "./views/ProductList";
import ProductDetail from "./views/ProductDetail";
import ProductAdd from "./views/ProductAdd";
import ProductAPI from "./service";
import "./App.css";

function App() {
  const [products, setProducts] = useState(ProductAPI.all());
  const [selectedId, setSelectedId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const refresh = () => setProducts([...ProductAPI.all()]);

  const handleAdd = (product) => {
    ProductAPI.add(product);
    refresh();
    setIsAdding(false);
  };

  const handleUpdate = (product) => {
    ProductAPI.update(product);
    refresh();
    setEditingId(null);
  };

  const handleDelete = (id) => {
    ProductAPI.delete(id);
    refresh();
    if (selectedId === id) setSelectedId(null);
    if (editingId === id) setEditingId(null);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (isAdding) setIsAdding(false);
      if (editingId !== null) setEditingId(null);
      if (selectedId !== null) setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isAdding, editingId, selectedId]);

  if (isAdding) {
    return (
      <ProductAdd
        onSave={handleAdd}
        onCancel={() => setIsAdding(false)}
      />
    );
  }

  if (editingId !== null) {
    const editing = ProductAPI.get(editingId);
    return (
      <ProductAdd
        initial={editing}
        onSave={handleUpdate}
        onCancel={() => setEditingId(null)}
      />
    );
  }

  if (selectedId !== null) {
    return (
      <ProductDetail
        id={selectedId}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <ProductList
      products={products}
      onSelect={setSelectedId}
      onAdd={() => setIsAdding(true)}
      onDelete={handleDelete}
      onEdit={(id) => setEditingId(id)}
    />
  );
}

export default App;