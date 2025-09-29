import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.product = props.product;
    this.cartContext = props.cartContext;
  }

  handleAddToCart() {
    this.cartContext.addProduct(this.product);
  }

  render() {
    const li = document.createElement("li");
    li.className = "product-item";

    li.innerHTML = `
      <div class="product-card">
        <img src="${this.product.image}" alt="${this.product.title}" class="product-image" />
        <div class="product-info">
          <h4 class="product-title">${this.product.title}</h4>
          <p class="product-price">$${this.product.price}</p>
          <button class="add-to-cart-btn">🛒 Add</button>
        </div>
      </div>
    `;

    li.querySelector(".add-to-cart-btn").addEventListener("click", () => {
      this.handleAddToCart();
    });

    return li;
  }
}
