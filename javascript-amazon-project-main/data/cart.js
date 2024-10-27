export let cart = JSON.parse(localStorage.getItem('cart'));

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

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId)
            matchingItem = cartItem;    
    });

    if(matchingItem){
        matchingItem.quantity += Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    }else{
        cart.push({
            productId: productId,
            quantity: Number(document.querySelector(`.js-quantity-selector-${productId}`).value),
            deliveryOptions: '1'
        });
    }

    let messageTimeout = {};

    document.querySelector(`.js-add-to-cart-message-${productId}`).classList.add('added-to-cart-opacity');
    
    if (messageTimeout[productId]) {
        clearTimeout(messageTimeout[productId]);
    }

    messageTimeout[productId] = setTimeout(() => { 
        document.querySelector(`.js-add-to-cart-message-${productId}`).classList.remove('added-to-cart-opacity');
    }, '2000');

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

    if(className === '.js-checkout-quantity')
        if(productQuantity === 1)
            return document.querySelector(className).innerHTML = productQuantity + ' item';
        else
            return document.querySelector(className).innerHTML = productQuantity + ' items';
    
    return document.querySelector(className).innerHTML = productQuantity;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        console.log(cartItem);
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