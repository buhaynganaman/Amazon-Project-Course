import { orders } from "../../data/ordersData.js";
import { getProduct } from "../../data/products.js";
import { readableDate } from "../utils/date & time/date.js";

export function renderYourOrders() {

  let yourOdersHTML = ``;

  orders.getData().forEach((orderItem) => {
    yourOdersHTML += 
    `
        <div class="order-container js-OrderContainer-${orderItem.id}">
          
          <!-- HEADER PART -->
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${readableDate(orderItem.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${orderItem.totalCostCents}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.id}</div>
            </div>
          </div>

          <!-- PRODUCT DETAIL PART -->
          ${renderProductDetails(orderItem.products)}

        </div>
    `;
  })

  const orderContainer = document.querySelector('.js-OrdersGrid');
  orderContainer.innerHTML = yourOdersHTML;

}

function renderProductDetails(products) {
  let productDetails = ``;

  products.forEach(product => {
    const matchingProduct = getProduct(product.productId);

    productDetails +=
    `
      <div class="order-details-grid js-orderDetails-${matchingProduct.getID()}">

        <div class="product-image-container">
          <img src="${matchingProduct.getImageUrl()}">
        </div>

        <div class="product-details">
          <div class="product-name">
          ${matchingProduct.getName()}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${readableDate(product.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary">
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