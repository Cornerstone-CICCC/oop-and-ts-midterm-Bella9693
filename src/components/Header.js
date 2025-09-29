import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.cartList = props.cartList;
  }

  render() {
    const header = document.createElement("header");

    const logo = document.createElement("div");
    logo.className = "logo";
    logo.textContent = this.props.title;
    header.appendChild(logo);

    const headerMenu = document.createElement("div");
    headerMenu.className = "header-menu";

    const trolleyIcon = document.createElement("img");
    trolleyIcon.src = "./images/trolley.png";
    trolleyIcon.alt = "Cart";
    trolleyIcon.style.cursor = "pointer";

    trolleyIcon.addEventListener("click", () => {
      this.cartList.toggle();
    });

    headerMenu.appendChild(trolleyIcon);
    header.appendChild(headerMenu);

    return header;
  }
}
