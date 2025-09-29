import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.item = props.item;
    this.cartContext = props.cartContext;
  }

  render() {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";

    itemEl.innerHTML = `
      <img src="${this.item.image}" alt="${this.item.title}" class="cart-item-img"/>
      <div class="cart-item-info">
        <span class="cart-item-title">${this.item.title}</span>
        <span class="cart-item-price">$${this.item.price}</span>
      </div>
      <div class="cart-item-controls">
        <button class="decrease-btn">-</button>
        <span class="quantity">${this.item.quantity}</span>
        <button class="increase-btn">+</button>
        <button class="remove-btn">x</button>
      </div>
    `;

    itemEl.querySelector(".decrease-btn").addEventListener("click", () => {
      if (this.item.quantity > 1) {
        this.cartContext.updateQuantity(this.item.id, this.item.quantity - 1);
      }
    });

    itemEl.querySelector(".increase-btn").addEventListener("click", () => {
      this.cartContext.updateQuantity(this.item.id, this.item.quantity + 1);
    });

    itemEl.querySelector(".remove-btn").addEventListener("click", () => {
      this.cartContext.removeProduct(this.item.id);
    });

    return itemEl;
  }
}
