import { formatCurrency } from "../Scripts/utils/money.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { searchBar, search } from "./utils/search.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

loadProductsFetch().then(renderOrdersGrid);

function renderOrdersGrid() {
  let ordersHTML = '';

  orders.forEach((order) => {
    const dateString = order.orderTime;
    const formattedDate = dayjs(dateString).format("MMMM D");

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formattedDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
    `;

    order.products.forEach((product) => {
      const prod = getProduct(product.productId);

      if (prod) {
        ordersHTML += `
          <div class="product-image-container">
            <img src="${prod.image || ''}" alt="${prod.name || 'Product'}">
          </div>
          <div class="product-details">
            <div class="product-name">${prod.name}</div>
            <div class="product-delivery-date">Arriving on: ${dayjs(product.estimatedDeliveryTime).format("MMMM D")}</div>
            <div class="product-quantity">Quantity: ${product.quantity || 1}</div>
            <button class="buy-again-button button-primary js-buy-again-message" data-product-id=${product.productId}>
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        `;
      } else {
        console.warn(`Product with ID ${product.productId} not found.`);
      }
    });

    ordersHTML += `
        </div> <!-- End of order-details-grid -->
      </div> <!-- End of order-container -->
    `;
  });

  document.querySelector('.js-order-container').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again-message').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId; 
      
      if(addToCart(productId)) console.log('Added');
      calculateCartQuantity('.js-cart-quantity'); 
    });
  });

  searchBar();
  search();

  Window.onload = calculateCartQuantity('.js-cart-quantity');
}
