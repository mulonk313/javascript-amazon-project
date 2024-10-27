import { calculateCartQuantity } from '../../data/cart.js';

export function renderCheckoutHeader(){
    const checkoutHeaderSummaryHTML = 
    `
    Checkout (<a class="return-to-home-link js-checkout-quantity" 
    href="amazon.html"></a>)
    `

    document.querySelector('.js-checkout-header-summary').innerHTML = checkoutHeaderSummaryHTML;
    Window.onload = calculateCartQuantity('.js-checkout-quantity');
}