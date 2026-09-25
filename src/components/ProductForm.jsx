import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";

export function ProductForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [stock, setStock] = useState(initial?.stock ?? "");

  const nameRef = useRef(null);
  const isEdit = Boolean(initial);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    setName(initial?.name ?? "");
    setPrice(initial?.price ?? "");
    setCategory(initial?.category ?? "");
    setStock(initial?.stock ?? "");
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const data = {
      name: name.trim(),
      price: Number(price) || 0,
      category: category.trim(),
      stock: Number(stock) || 0,
    };

    onSubmit(isEdit ? { ...initial, ...data } : data);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Название
        <input
          ref={nameRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Цена, BYN
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
        />
      </label>
      <label>
        Категория
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        Остаток, шт.
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
        />
      </label>
      <div className="form-actions">
        <Button type="submit" variant="primary">
          {isEdit ? "Сохранить" : "Добавить"}
        </Button>
        <Button type="button" variant="cancel" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
}