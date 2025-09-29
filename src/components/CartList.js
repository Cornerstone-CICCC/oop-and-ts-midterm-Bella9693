import { Component } from "../common/Component.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.cartContext = props.cartContext;
    this.cartItems = [];
    this.isOpen = false;
    this.container = null;
    this.header = null;

    this.cartContext.subscribe((cart) => {
      if (this.container) this.update(cart);
    });
  }

  render() {
    return null;
  }

  toggle() {
    this.isOpen = !this.isOpen;

    if (!this.container) {
      this.container = document.createElement("div");
      this.container.className = "cart-popup hidden";
      document.body.appendChild(this.container);

      this.header = document.createElement("div");
      this.header.className = "cart-popup-header";
      this.header.innerHTML = `
        <h3>Cart</h3>
        <button class="cart-close-btn">✖</button>
      `;
      this.header
        .querySelector(".cart-close-btn")
        .addEventListener("click", () => {
          this.isOpen = false;
          this.container.classList.add("hidden");
        });

      this.container.appendChild(this.header);
    }

    this.update(this.cartContext.cart);
    this.container.classList.toggle("hidden", !this.isOpen);
  }

  update(cart) {
    this.cartItems = cart;
    if (!this.container) return;

    const itemsToRemove = Array.from(this.container.children).filter(
      (el) => el !== this.header
    );
    itemsToRemove.forEach((el) => el.remove());

    this.header.querySelector("h3").textContent = `Cart (${cart.length})`;

    if (cart.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.className = "empty-cart";
      emptyMsg.textContent = "Your cart is empty.";
      this.container.appendChild(emptyMsg);
      return;
    }

    cart.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-img"/>
        <span class="cart-item-title">${item.title}</span>
        <span class="cart-item-price">$${item.price}</span>
        <input type="number" min="1" value="${item.quantity}" class="cart-qty-input" data-index="${index}"/>
        <button class="remove-btn" data-index="${index}">❌</button>
      `;
      this.container.appendChild(itemEl);

      itemEl
        .querySelector(".cart-qty-input")
        .addEventListener("change", (e) => {
          const newQty = parseInt(e.target.value);
          if (newQty > 0) {
            this.cartContext.cart[index].quantity = newQty;
            this.cartContext.notifyListeners();
          }
        });

      itemEl.querySelector(".remove-btn").addEventListener("click", () => {
        this.cartContext.cart.splice(index, 1);
        this.cartContext.notifyListeners();
      });
    });

    const totalContainer = document.createElement("div");
    totalContainer.className = "cart-total";
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalContainer.innerHTML = `
      <button class="checkout-btn">Checkout</button>
      <span>Total: $${total.toFixed(2)}</span>
    `;
    totalContainer
      .querySelector(".checkout-btn")
      .addEventListener("click", () => {
        alert("Proceeding to checkout...");
      });
    this.container.appendChild(totalContainer);
  }
}
