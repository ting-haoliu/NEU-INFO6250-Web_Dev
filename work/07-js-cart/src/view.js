import { products, cart, getCartItemCount } from "./model";

function renderProduct() {
    const productList = document.querySelector('.product');
    productList.innerHTML = products.map(product => {
        return `
            <li class="product-list">
                <img class="product-img" src="${product.image}" alt="${product.name}">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button data-id="${product.id}" id="add-button">Add to Cart</button>
            </li>
        `;
    }).join('');
}

function renderCart() {
    const cartList = document.querySelector('.cart');

    if (Object.keys(cart).length === 0) {
        cartList.innerHTML = '<p>Nothing in the cart</p>';
    } else {
        let totalCartPrice = 0;

        const cartItems = Object.keys(cart).map(id => {
            const product = products.find(p => p.id === parseInt(id));
            const quantity = cart[id];
            const totalPrice = (product.price * quantity).toFixed(2);

            totalCartPrice += parseFloat(totalPrice);

            return `
                <li class="cart-list">
                    <img class="cart-list__img" src="${product.image}" alt="${product.name}">
                    <h3 class="cart-list__name">${product.name}</h3>
                    <span class="cart-list__price">$${totalPrice}</span>

                    <button id="minus-button" data-id="${id}" class="quantity-btn">-</button>
                    <p class="quantity-text" data-id="${id}">${quantity}</p>
                    <button id="plus-button" data-id="${id}" class="quantity-btn">+</button>
                    <button id="remove-button" data-id="${id}">remove</button>
                </li>
            `;
        }).join('');

        cartList.innerHTML = `
            ${cartItems}
            <p class="total-price">Total Price: $${totalCartPrice.toFixed(2)}</p>
            <button id="checkout-button">Checkout</button>
        `;
    }
}

function showCart(cartContainer, viewButton, hideButton) {
    cartContainer.classList.remove('hidden');
    viewButton.classList.add('hidden');
    hideButton.classList.remove('hidden');
}

function hideCart(cartContainer, viewButton, hideButton) {
    cartContainer.classList.add('hidden');
    viewButton.classList.remove('hidden');
    hideButton.classList.add('hidden');
}

function updateViewCartButton() {
    const viewCartBtn = document.querySelector('#view-cart__button');
    const itemCount = getCartItemCount();
    viewCartBtn.textContent = `View Cart (${itemCount})`;
}

export {
    renderProduct,
    renderCart,
    showCart,
    hideCart,
    updateViewCartButton,
};