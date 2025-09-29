export class CartContext {
  constructor() {
    this.cart = [];
    this.listeners = [];
  }

  getCart() {
    return this.cart;
  }

  addProduct(item) {
    const existing = this.cart.find((p) => p.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    this.notifyListeners();
  }

  updateQuantity(id, quantity) {
    const product = this.cart.find((p) => p.id === id);
    if (product) {
      product.quantity = Math.max(1, quantity); // 최소 1개
      this.notifyListeners();
    }
  }

  removeProduct(id) {
    this.cart = this.cart.filter((p) => p.id !== id);
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.cart));
  }
}
