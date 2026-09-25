import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p style={{ padding: 20 }}>Товаров нет</p>;
  }
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}