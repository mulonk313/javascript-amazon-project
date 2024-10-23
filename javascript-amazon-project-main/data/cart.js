export const cart = [];

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
            quantity: Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
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

}