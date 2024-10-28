import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

    beforeEach(() => {
        // Mock localStorage methods
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]); // Simulate an empty cart
        });

        //Mock function(we mock the method of the function(like fake version))
        //we create this function to test 
        //cart when its empty, 
        //even if has items. We make it empty

        // Mock the quantity input element
        const quantityInput = document.createElement('input');
        quantityInput.className = `js-quantity-selector-${productId}`;
        quantityInput.value = '1'; // Set default value for quantity input
        document.body.appendChild(quantityInput);

        loadFromStorage(); // Load the cart
    });

    afterEach(() => {
        // Clean up after each test
        document.querySelector(`.js-quantity-selector-${productId}`)?.remove();
        cart.length = 0; // Reset the cart
    });

    it('adds a new product to the cart', () => {

        localStorage.getItem.and.callFake(() => JSON.stringify([])); 

        loadFromStorage();

        addToCart(productId);
        
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(1); // Ensure quantity is correct

        
    });

    it('adds an existing product to the cart', () => {
        addToCart(productId); // First time adding product

        expect(cart.length).toEqual(1); // Still only one item in cart
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId);
        expect(cart[0].quantity).toEqual(2); // Quantity should be incremented
    });
});
