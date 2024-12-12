import { v4 as uuid } from 'uuid';

import carts from './carts.js';
import products from './products.js';

const orders = {};

function makeOrder(username) {
	const id = uuid();
	const cart = carts.getCart(username);
	const madeOrderFailed = false;

	if (!cart) {
		return madeOrderFailed;
	}

	// Reduce inventory of our products in stock for each item
	const canReduceInventory = Object.keys(cart.items).every(itemId => {
		const item = cart.items[itemId];
		const product = products.getProduct(itemId);

		return item && product && (product?.inventory - item?.quantity) >= 0;
	});

	if (!canReduceInventory) {
		return madeOrderFailed;
	}

	Object.keys(cart.items).forEach(itemId => {
		const item = cart.items[itemId];
		products.reduceInventory(item.id, item.quantity);
	});

	orders[id] = {
		id: id,
		username: username,
		items: cart.items,
		totalQuantity: cart.totalQuantity,
		totalPrice: cart.totalPrice,
	};

	carts.deleteCartFor(username);

	return id;
}

export default {
	makeOrder,
	orders
};