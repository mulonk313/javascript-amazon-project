class Cart {
    cartItems;
    #localStorageKey; //# ----> makes the property private

    consrtuctor(){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if(!this.cartItems){
            this.cartItems = [{
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

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId){
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId)
                matchingItem = cartItem;    
        });
    
        const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = quantityElement ? Number(quantityElement.value) : 0;
    
        if(matchingItem){
            matchingItem.quantity += Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        }else{
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionsId: '1'
            });
        }
    
        let messageTimeout = {};
    
        const messageElement = document.querySelector(`.js-add-to-cart-message-${productId}`);
        messageElement 
        ? messageElement.classList.add('added-to-cart-opacity')
        : console.warn(`Element .js-add-to-cart-message-${productId} not found in the DOM.`);
        
        if (messageTimeout[productId]) {
            clearTimeout(messageTimeout[productId]);
        }
    
        messageTimeout[productId] = setTimeout(() => { 
            document.querySelector(`.js-add-to-cart-message-${productId}`).classList.remove('added-to-cart-opacity');
        }, '2000');
    
        this.saveToStorage();
    }

    removeFromCart(productId){
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId !== productId) newCart.push(cartItem);
        });
    
        this.cartItems = newCart;
    
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId)
                matchingItem = cartItem;    
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    }

    removeFromCart(productId){
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId !== productId) newCart.push(cartItem);
        });
    
        this.cartItems = newCart;
    
        this.saveToStorage();
    }
    
    calculateCartQuantity(className) {
        let productQuantity = 0;
    
        this.cartItems.forEach((cartItem) => {
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

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            console.log(cartItem);
            if (cartItem.productId === productId) {
                cartItem.quantity = newQuantity; 
            }
            console.log(cartItem);
        });
    
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
        this.calculateCartQuantity('.js-checkout-quantity');
        
        this.saveToStorage();
    
    }
    
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



