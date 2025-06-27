import { orders } from "../../data/ordersData.js";
import { getProduct } from "../../data/products.js";

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
              <div>${orderItem.getTotal()}</div>
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
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">Track package</button>
          </a>
        </div>
      </div>
    `;
  });
  
  return productDetails;
}
