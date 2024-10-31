export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart){
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionsId: '1'
        },{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionsId: '2'
        }];
    }

}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId)
            matchingItem = cartItem;    
    });

    const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = quantityElement ? Number(quantityElement.value) : 0;

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionsId: '1'
        });
    }

    //let messageTimeout = {};

    // const messageElement = document.querySelector(`.js-add-to-cart-message-${productId}`);
    // messageElement 
    // ? messageElement.classList.add('added-to-cart-opacity')
    // : console.warn(`Element .js-add-to-cart-message-${productId} not found in the DOM.`);
    
    // if (messageTimeout[productId]) {
    //     clearTimeout(messageTimeout[productId]);
    // }

    // messageTimeout[productId] = setTimeout(() => { 
    //     document.querySelector(`.js-add-to-cart-message-${productId}`).classList.remove('added-to-cart-opacity');
    // }, '2000');

    saveToStorage();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) newCart.push(cartItem);
    });

    cart = newCart;

    saveToStorage();
}

export function calculateCartQuantity(className) {
    let productQuantity = 0;

    cart.forEach((cartItem) => {
        productQuantity += cartItem.quantity;
    });

    const element = document.querySelector(className);
    if (!element) return productQuantity;

    if(className === '.js-checkout-quantity'){
        if(productQuantity === 1)
            element.innerHTML = productQuantity + ' item';
        else
            element.innerHTML = productQuantity + ' items';
    }else element.innerHTML = productQuantity;
    
    return productQuantity;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity; 
        }
        console.log(cartItem);
    });

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    calculateCartQuantity('.js-checkout-quantity');
    
    saveToStorage();

}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId)
            matchingItem = cartItem;    
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export function loadCart(fun = () => {}) {
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      fun();
    });
    
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }