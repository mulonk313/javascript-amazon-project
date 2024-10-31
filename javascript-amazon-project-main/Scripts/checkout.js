import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practise.js'

async function loadPage(){
    try{
        //throw 'error1';

        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {
            //throw 'error2';
            loadCart(()  => {
                //reject('error3');
                resolve('value3');
            });
        });
    }catch(e){
        console.log('Unexepected error. Please try again later.');
    }
    
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}

loadPage();

/*Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(()  => {
            resolve('value2');
        });
    })
]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});*/

