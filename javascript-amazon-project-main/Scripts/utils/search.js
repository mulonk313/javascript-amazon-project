import { loadProductsFetch,products } from "../../data/products.js";
import { calculateCartQuantity, addToCart } from "../../data/cart.js";

export function searchBar() {
    const searchButton = document.querySelector('.js-search-button');
    const searchBarElement = document.querySelector('.js-search-bar-value');

    const searchItem = () => {
        const searchItem = searchBarElement ? searchBarElement.value : '';
        window.location.href = `amazon.html?search=${encodeURIComponent(searchItem)}`;
    }

    if (searchButton) {
        searchButton.addEventListener('click', searchItem);
    } else {
        console.warn("Search button not found in the DOM.");
    }

    if (searchBarElement) {
        searchBarElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchItem();
            }
        });
    } else {
        console.warn("Search bar element not found in the DOM.");
    }
}




export async function search() {
    await searchBar(); 
    const url = new URL(window.location.href);
    const searchUrl = url.searchParams.get('search');

    loadProductsFetch().then(find);

    function find(){
        const filteredProducts = products.filter(prod => 
            prod.name.toLowerCase().includes(searchUrl.toLowerCase()) || 
            prod.keywords.some(keyword => keyword.toLowerCase().includes(searchUrl.toLowerCase())) 
        );

        let productsHTML = '';

        filteredProducts.forEach((product) => {
        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src=${product.image}>
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                ${product.extraInfoHTML()}

                <div class="product-spacer"></div>

                <div class="added-to-cart js-add-to-cart-message-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id=${product.id}>
                    Add to Cart
                </button>
            </div>`;
        });

        document.querySelector('.js-products-grid').innerHTML = productsHTML;

        document.querySelectorAll('.js-add-to-cart').forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                addToCart(productId);
                calculateCartQuantity('.js-cart-quantity');
            });
        });
        
    }

}
