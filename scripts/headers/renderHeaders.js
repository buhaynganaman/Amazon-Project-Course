import { cart } from '../../data/cart-class.js';
import { products } from '../../data/products.js';
import { loadApp } from '../utils/loadApp/apploader.js';

loadApp([renderHeaders]);


function renderHeaders() {

  let headerHTML = '';

  headerHTML += 
  `
      <!-- HEADER LEFT SECTION -->
      <div class="amazon-header-left-section">
        <a href="amazon.html" class="header-link">
          <img class="amazon-logo"
            src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png">
        </a>
      </div>

      <!-- HEADER MIDLE SECTION -->
      <div class="amazon-header-middle-section">
        <input class="search-bar js-searchBar" type="text" placeholder="Search">

        <button class="search-button js-searchBTN">
          <img class="search-icon" src="images/icons/search-icon.png">
        </button>
      </div>

      <!-- HEADER RIGHT SECTION -->
      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity js-cartQuantity"><!-- Cart Quantity --></div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
  `;

  const headers = document.querySelector('.js-amazonHeaders');
  headers.innerHTML = headerHTML;

  // Search Button Functionality
  document.querySelector('.js-searchBTN').addEventListener('click', () => {
    // Get the search input value
    const searchValue = document.querySelector('.js-searchBar').value.trim();
    // If no search value will not work, else will work.
    if(!searchValue) {
      return;
    } else {
      window.location.href = `amazon.html?search=${searchValue}`;
    }
    
  })
}



export function updateCartQuantity() { // Render the quantity in the cart header
	const renderCartQuantity = document.querySelector(".js-cartQuantity");

  renderCartQuantity.textContent = cart.calculateCartQuantity();

  if (cart.calculateCartQuantity() === 0) {
		renderCartQuantity.textContent = "0";
	}
  
}


renderHeaders();