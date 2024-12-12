import constants from './products-constant.js';

const products = {};

function reset() {
    Object.keys(products).forEach(key => {
        delete products[key];
    });
}

function makeProductsList() {
    if (!Object.keys(products).length) {
        const products_constant = constants.PRODUCTS_CONSTANT.slice(0, constants.INITIAL_PRODUCTS_COUNT);
        products_constant.forEach(product => {
            addProduct(product.id, product.title, product.price, product.image, product.inventory);
        });
    }
}

function getProduct(id) {
    return products[id];
}

function contains(id) {
    return !!products[id];
}

function reduceInventory(id, quantity) {
    if (products[id] && (products[id].inventory - quantity) >= constants.MIN_INVENTORY) {
        products[id].inventory -= quantity;
    } else {
        return false;
    }
    return true;
}

function addProduct(id, productName, price, image = '1.jpg', inventory = constants.MAX_INVENTORY) {

    if (containsByImage(image)) {
        return; // The product has been in the stock
    }

    products[id] = {
        id: id,
        title: productName,
        price: price,
        image: image,
        inventory: inventory,
    };
}

function containsByImage(image) {
    return !!Object.values(products).some(product => product.image === image);
}

export default {
    reset,
    makeProductsList,
    getProduct,
    contains,
    reduceInventory,
    products
};
