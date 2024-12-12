export const products = [
    { id: 1, name: 'Jorts', price: 0.99, image: '/images/Jorts.jpg' },
    { id: 2, name: 'Jean', price: 3.14, image: '/images/Jean.jpg' },
    { id: 3, name: 'Nyancat', price: 2.73, image: '/images/Nyancat.jpg' },
];

export const cart = {};

export function addToCart(productId) {
    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }
};

export function removeFromCart(productId) {
    delete cart[productId];
}

export function addQuantity(productId) {
    if (cart[productId]) {
        cart[productId]++;
    }
}

export function minusQuantity(productId) {
    if (cart[productId] > 1) {
        cart[productId]--;
    } else {
        delete cart[productId];
    }
}

export function getCartItemCount() {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

export function checkout() {
    Object.keys(cart).forEach(productId => delete cart[productId]);
}