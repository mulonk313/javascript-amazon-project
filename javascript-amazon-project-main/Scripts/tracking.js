import { formatCurrency } from "../Scripts/utils/money.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

loadProductsFetch().then(renderTrackingGrid);

function renderTrackingGrid() {
    let trackingHTML = '';
    let percentage = 0;

    const url = new URL(window.location.href);
    const orderIdUrl = url.searchParams.get('orderId');
    const productIdUrl = url.searchParams.get('productId');

    orders.forEach((order) => {
        if (order.id === orderIdUrl) {
            order.products.forEach((product) => {
                if (product.productId === productIdUrl) {
                    const prod = getProduct(productIdUrl);

                    const today = dayjs(); 
                    const orderDate = dayjs(order.orderTime); 
                    const deliveryDate = dayjs(product.estimatedDeliveryTime);
                    const daysSinceOrder = today.diff(orderDate, 'days');
                    const deliveryDaysDifference = deliveryDate.diff(orderDate, 'days');
                    
                    if (deliveryDaysDifference !== 0) {
                        percentage = (daysSinceOrder / deliveryDaysDifference) * 100;
                        console.log(`Percentage of days since order: ${percentage}`);
                    } else {
                        console.log('No difference in days between order and delivery time.');
                    }

                    trackingHTML += `
                        <a class="back-to-orders-link link-primary" href="orders.html">
                            View all orders
                        </a>

                        <div class="delivery-date">
                            Arriving on ${dayjs(product.estimatedDeliveryTime).format("dddd, MMMM D")}
                        </div>

                        <div class="product-info">
                            ${prod.name || 'Product Name'} <!-- Use dynamic product name -->
                        </div>

                        <div class="product-info">
                            Quantity: ${prod.quantity || 1} <!-- Use dynamic product quantity -->
                        </div>

                        <img class="product-image" src="${prod.image || 'default-image.jpg'}" alt="${prod.name || 'Product Image'}"> <!-- Use dynamic product image -->

                        <div class="progress-labels-container">
                            <div class="progress-label" id="preparing-label">Preparing</div>
                            <div class="progress-label" id="shipped-label">Shipped</div>
                            <div class="progress-label" id="delivered-label">Delivered</div>
                        </div>

                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: 66%;"></div> <!-- Example progress; adjust as necessary -->
                        </div>`;
                }
            });
        }
    });
    
    const orderTrackingElement = document.querySelector('.js-order-tracking');
    if (orderTrackingElement) {
        orderTrackingElement.innerHTML = trackingHTML;
    } else {
        console.warn("Element with class 'js-order-tracking' not found in the DOM.");
    }

    const progressLabel = document.querySelector('.progress-bar');

    let barStatus = 0;
    progressLabel.style.width = `${percentage}%`;
    if (progressLabel) {
        let labelElement; 
        if (percentage >= 0 && percentage <= 49) {
            labelElement = document.getElementById("preparing-label");
        } else if (percentage >= 50 && percentage <= 99) {
            labelElement = document.getElementById("shipped-label");
        } else {
            labelElement = document.getElementById("delivered-label");
        }
    
        if (labelElement) {
            labelElement.classList.add("current-status");
        } else {
            console.error(`Element with ID '${labelElement?.id}' not found.`);
        }
    }

    Window.onload = calculateCartQuantity('.js-cart-quantity');
}
