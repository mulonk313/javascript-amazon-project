export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

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