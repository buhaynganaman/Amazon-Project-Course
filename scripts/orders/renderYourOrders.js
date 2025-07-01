import { orders } from "../../data/ordersData.js";
import { getProduct } from "../../data/products.js";
import { cart } from "../../data/cart-class.js";
import { updateCartQuantity } from "../headers/renderHeaders.js";

export function renderYourOrders() {
  let yourOdersHTML = ``;

  orders.getOrders().forEach(orderItem => {
    yourOdersHTML += `
      <div class="order-container js-OrderContainer-${orderItem.getId()}">

        <!-- HEADER PART -->
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderItem.getDate()}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${orderItem.getTotal()}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderItem.getId()}</div>
          </div>
        </div>

        <!-- PRODUCT DETAIL PART -->
        ${renderProductDetails(orderItem.getProducts())}
      </div>
    `;
  });

  const orderContainer = document.querySelector('.js-OrdersGrid');
  orderContainer.innerHTML = yourOdersHTML;

  // Buy It Again Button
  document.querySelectorAll('.js-BuyItAgainBTN').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset; // Get the button data-attribute to identify which product is clicked
      cart.addToCart(productId, 1);
      addedMessage(productId);
      updateCartQuantity();
    })
  })

  // Initialize timeout IDs for setTimeout in an object to store each product timeout ID
	const addedMessageTimeouts = {};
	function addedMessage(productId) {
		const previousTimeoutId = addedMessageTimeouts[productId];
		if (previousTimeoutId) {
			clearTimeout(previousTimeoutId); // Restart timeout if it exists
		}

		const addedMessage = document.querySelector(`.js-BuyItAgainBTN-${productId}`);
		addedMessage.textContent = '✔ Added'; // Show added message

		const timeoutID = setTimeout(() => {
      addedMessage.textContent = '';
			addedMessage.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      `;
		}, 2000);

		// Save the timeoutId for this product
		addedMessageTimeouts[productId] = timeoutID;
	}
}

function renderProductDetails(products) {
  let productDetails = ``;

  products.forEach(productItem => {
    const matchingProduct = getProduct(productItem.getProductId());

    productDetails += `
      <div class="order-details-grid js-orderDetails-${matchingProduct.getID()}">

        <div class="product-image-container">
          <img src="${matchingProduct.getImageUrl()}">
        </div>

        <div class="product-details">

          <div class="product-name">${matchingProduct.getName()}</div>
          <div class="product-delivery-date">Arriving on: ${productItem.getDeliveryDate()}</div>
          <div class="product-quantity">Quantity: ${productItem.getQuantity()}</div>

          <button class="buy-again-button button-primary js-BuyItAgainBTN js-BuyItAgainBTN-${matchingProduct.getID()}" 
          data-product-id="${matchingProduct.getID()}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>

        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
            Track package
            </button>
          </a>
        </div>
        
      </div>
    `;
  });
  return productDetails;
}