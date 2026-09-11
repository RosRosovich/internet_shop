const ProductAPI = {
  products: [
     { id: 1, name: "Ноутбук Lenovo", price: 1850, category: "Электроника", stock: 12 },
     { id: 2, name: "Смартфон Xiaomi", price: 850, category: "Электроника", stock: 30 },
     { id: 3, name: "Наушники Sony", price: 270, category: "Аудио", stock: 5 },
     { id: 4, name: "Клавиатура Logitech", price: 120, category: "Аксессуары", stock: 18 },
     { id: 5, name: "Монитор Samsung", price: 620, category: "Электроника", stock: 7 },
     { id: 6, name: "Мышь Razer", price: 150, category: "Аксессуары", stock: 0 },
],

  all: function () {
    return this.products;
  },

  get: function (id) {
    return this.products.find((p) => p.id === id);
  },

  delete: function (id) {
    this.products = this.products.filter((p) => p.id !== id);
    return true;
  },

  add: function (product) {
    let newProduct = product;
    if (!newProduct.id) {
      const maxId = this.products.reduce(
        (max, p) => (p.id > max ? p.id : max),
        0
      );
      newProduct = { ...newProduct, id: maxId + 1 };
    }
    this.products = [...this.products, newProduct];
    return newProduct;
  },

  update: function (product) {
    this.products = this.products.map((p) =>
      p.id === product.id ? { ...p, ...product } : p
    );
    return product;
  },
};ы

export default ProductAPI;