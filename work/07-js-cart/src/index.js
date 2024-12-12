import { renderProduct, renderCart, updateViewCartButton, showCart, hideCart } from "./view";
import { addToCart, removeFromCart, addQuantity, minusQuantity, checkout } from "./model";

renderProduct();
renderCart();
updateViewCartButton();

const navList = document.querySelector('.navbar-list');
const productList = document.querySelector('.product');
const cartList = document.querySelector('.cart');

const cartContainer = document.querySelector('#cart-container');
const viewButton = document.querySelector('#view-cart__button');
const hideButton = document.querySelector('#hide-cart__button');


navList.addEventListener('click', (event) => {
    if (event.target.id === 'view-cart__button') {
        showCart(cartContainer, viewButton, hideButton);
    }

    if (event.target.id === 'hide-cart__button') {
        hideCart(cartContainer, viewButton, hideButton);
    }
});


productList.addEventListener('click', (event) => {
    if (event.target.id === 'add-button') {
        const productId = event.target.dataset.id;
        addToCart(productId);
        renderCart();
        updateViewCartButton();
    }
});

cartList.addEventListener('click', (event) => {
    if (event.target.id === 'plus-button') {
        const productId = event.target.dataset.id;
        addQuantity(productId);
        renderCart();
        updateViewCartButton();
    }

    if (event.target.id === 'minus-button') {
        const productId = event.target.dataset.id;
        minusQuantity(productId);
        renderCart();
        updateViewCartButton();
    }

    if (event.target.id === 'remove-button') {
        const productId = event.target.dataset.id;
        removeFromCart(productId);
        renderCart();
        updateViewCartButton();
    }

    if (event.target.id === 'checkout-button') {
        checkout();
        hideCart(cartContainer, viewButton, hideButton);
        renderCart();
        updateViewCartButton();
    }
});