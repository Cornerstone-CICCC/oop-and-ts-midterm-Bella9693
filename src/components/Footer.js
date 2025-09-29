import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement("footer");
    footer.innerHTML = `
      <div class="footer-menu">
        <div class="footer-explain">
          <div class="logo">Slick</div>
          <p>We have clothes that suits your style and which you're proud to wear. From women to men.</p> 
          <div class="footer-sns">
            <img src="./images/X.png" alt="Twitter">
            <img src="./images/facebook.png" alt="Facebook">
            <img src="./images/insta.png" alt="Insta">
            <img src="./images/github.png" alt="Github">
          </div>
        </div>
        <div class="newsletter">
          <h2>Subscribe for newsletter</h2>
          <form class="newsletter-form">
            <input type="email" placeholder="Enter Email..." required>
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
        <div class="quickLinks">
          <h2>Quick Links</h2>
          <ul class="quickMenu">
            <li>
                <a href="home">Home</a>
            </li>
            <li>
                <a href="#">Shop</a>
            </li>
            <li>
                <a href="#">Category</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li>
                <a href="#">Privacy</a>
            </li>
          </ul>
        </div>
      </div>
      <p>Copyright 2025. All rights reserved.</p>
    `;

    return footer;
  }
}
