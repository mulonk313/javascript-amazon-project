import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        
        const productId = cartItem.productId;
        const matchingProduct = products.find((product) => product.id === productId);
        const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
        
        if(cartItem.quantity === 0)
            removeFromCart(matchingProduct.id)

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${calculateDeliveryDate(deliveryOption)}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">
                    <div class="cart-item-details">
                        <div class="product-name">${matchingProduct.name}</div>
                        <div class="product-price">${matchingProduct.getPrice()}</div>
                        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                            <span>Quantity: 
                                <span class="quantity-label js-quantity-label js-quantity-label-${matchingProduct.id}">
                                    ${cartItem.quantity}
                                </span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">Update</span>
                            <input class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}">
                            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Delete</span>
                            <span class="validation-message js-validation-message">Update number must be between 0 and 1000.</span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">Choose a delivery option:</div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        const selectedOptionId = cartItem.deliveryOptionId || '1';
    
        return deliveryOptions.map((deliveryOption) => {
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
            const isChecked = deliveryOption.id === selectedOptionId;
    
            return `
                <div class="delivery-option js-delivery-option" 
                    data-product-id="${matchingProduct.id}" 
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">${calculateDeliveryDate(deliveryOption)}</div>
                        <div class="delivery-option-price">${priceString} Shipping</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();

            renderPaymentSummary();
            calculateCartQuantity('.js-checkout-quantity');
        });
    });

    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');
        });
    });

    document.querySelectorAll('.js-save-link').forEach((link) => {
        const productId = link.dataset.productId;

        const saveFunction = () => {
            const quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
            updateQuantity(productId, quantity);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove('is-editing-quantity');

            const afterUpdateValue = document.querySelector(`.js-quantity-input-${productId}`);
            if (afterUpdateValue) afterUpdateValue.value = "";

            renderOrderSummary(); 
            renderPaymentSummary();
        };

        link.addEventListener('click', saveFunction);

        document.querySelectorAll('.js-quantity-input').forEach((input) => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    saveFunction();
                }
            });
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const { deliveryOptionId, productId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary(); 
            renderPaymentSummary();
        });
    });
}

