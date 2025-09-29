import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";
import { CartContext } from "../contexts/CartContext.js";

export class App extends Component {
  render() {
    const appContainer = document.createElement("div");
    appContainer.classList.add("container");
    appContainer.innerHTML = `
      <div class="header"></div>
      <main></main>
      <div class="footer"></div>
    `;

    const cartContext = new CartContext();
    const cartList = new CartList({ cartContext });

    // Header
    const header = new Header({ title: "Slick", cartList }).render();
    appContainer.querySelector(".header").appendChild(header);

    // Main
    const main = appContainer.querySelector("main");

    // Hero Banner
    const heroBanner = document.createElement("section");
    heroBanner.className = "hero-banner";
    heroBanner.innerHTML = `
      <div class="hero-content">
        <h1>Welcome to Slick</h1>
        <p>Discover the latest trends and best deals</p>
      </div>
    `;
    main.appendChild(heroBanner);

    // Products Sections
    const sections = [
      { title: "NEW ARRIVALS", id: "new-arrivals" },
      { title: "TOP SELLING", sortBy: "count", id: "top-selling" },
      { title: "MAN CLOTHING", category: "men's clothing", id: "men-clothing" },
      {
        title: "WOMEN CLOTHING",
        category: "women's clothing",
        id: "women-clothing",
      },
    ];

    sections.forEach((sec) => {
      const list = new ProductList({
        cartContext,
        title: sec.title,
        category: sec.category || null,
        sortBy: sec.sortBy || null,
      });
      const el = list.render();
      el.id = sec.id;
      main.appendChild(el);
      list.mount(el);
    });

    // Footer
    const footer = new Footer().render();
    appContainer.querySelector(".footer").appendChild(footer);

    return appContainer;
  }
}
