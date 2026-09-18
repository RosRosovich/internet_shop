import { useState, useEffect, useRef } from "react";

function ProductAdd({ initial, onSave, onCancel }) {
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

    if (isEdit) {
      onSave({ ...initial, ...data });
    } else {
      onSave(data);
    }
  };

  return (
    <section>
      <button onClick={onCancel}>← Назад к списку</button>
      <h1>{isEdit ? `Редактирование: ${initial.name}` : "Новый товар"}</h1>

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
          <button type="submit" className="btn-primary">
            {isEdit ? "Сохранить" : "Добавить"}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductAdd;