import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.title = props.title || "Products"; // 섹션 제목
    this.category = props.category || null;
    this.sortBy = props.sortBy || null; // count 정렬 옵션
  }

  mount(container) {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        let filteredData = data;

        if (this.category) {
          filteredData = data.filter((item) => item.category === this.category);
        }

        if (this.sortBy === "count") {
          filteredData.sort((a, b) => b.rating.count - a.rating.count);
        }

        this.state.products = filteredData;

        const ul =
          container.querySelector("ul") || document.createElement("ul");
        ul.className = "slider";

        this.state.products.forEach((product) => {
          const productItemEl = new ProductItem({
            product,
            cartContext: this.props.cartContext,
          }).render();
          ul.appendChild(productItemEl);
        });

        if (!container.querySelector("ul")) container.appendChild(ul);
      })
      .catch((err) => console.error(err));
  }

  render() {
    const productList = document.createElement("div");
    productList.className = "product-list-container";

    const titleEl = document.createElement("h2");
    titleEl.textContent = this.title;
    productList.appendChild(titleEl);

    const sliderWrapper = document.createElement("div");
    sliderWrapper.className = "slider-wrapper";

    const prevBtn = document.createElement("button");
    prevBtn.className = "slider-btn prev";
    prevBtn.textContent = "◀";

    const nextBtn = document.createElement("button");
    nextBtn.className = "slider-btn next";
    nextBtn.textContent = "▶";

    const ul = document.createElement("ul");
    ul.className = "slider";

    sliderWrapper.appendChild(prevBtn);
    sliderWrapper.appendChild(ul);
    sliderWrapper.appendChild(nextBtn);
    productList.appendChild(sliderWrapper);

    const scrollAmount = 220;
    prevBtn.addEventListener("click", () => {
      ul.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      ul.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    return productList;
  }
}
