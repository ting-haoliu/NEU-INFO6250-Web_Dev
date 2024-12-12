import products from './products.js';

const carts = {}; // 'username' as the key

function getCart(username) {
	return carts[username];
}

// Initial a cart for the user
function makeCartFor(username) {
	carts[username] = {
		username: username,
		items: {},
		totalQuantity: 0,
		totalPrice: 0.0,
	}
}

function updateTotalValuesFor(username) {
	if (!carts[username]) {
		return;
	}

	const cart = carts[username];
	let totalQuantity = 0.0;
	let totalPrice = 0.0;

	for (const id in cart.items) {
		totalQuantity += cart.items[id].quantity;
		totalPrice += cart.items[id].subtotal;
	}
	cart.totalQuantity = totalQuantity;
	cart.totalPrice = parseFloat(totalPrice.toFixed(2));
}

function addItem(username, productId, quantity) {
	quantity = parseInt(quantity);

	const cart = carts[username];

	if (!cart.items[productId]) {

		if (!products.contains(productId)) {
			return;
		}

		const product = products.getProduct(productId);
		cart.items[productId] = {
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.image,
			inventory: product.inventory,
			quantity: quantity,
			subtotal: parseFloat((product.price * quantity).toFixed(2)),
		}
	} else {
		const newQuantity = cart.items[productId].quantity + quantity;
		const newSubTotal = cart.items[productId].price * newQuantity;
		cart.items[productId] = {
			...cart.items[productId],
			quantity: newQuantity,
			subtotal: parseFloat(newSubTotal.toFixed(2))
		};
	}
	updateTotalValuesFor(username);
}


function deleteCartFor(username) {
	makeCartFor(username); // Reset
}

function updateItemQuantity(username, productId, newQuantity) {
	newQuantity = parseInt(newQuantity);
	if (!carts[username]) {
		return;
	}

	const cart = carts[username];
	const item = cart.items[productId];

	if (!item) {
		return;
	}

	// Updates
	item.quantity = newQuantity;
	item.subtotal = parseFloat((item.price * newQuantity).toFixed(2));

	if (!item.quantity) {
		delete cart.items[productId];
	}

	updateTotalValuesFor(username);
}

// Check items in the user's cart with our products stock count
// If the product is out of stock, we update the quantity in the cart with the inventory
function checkInventory(username) {
	const cart = carts[username];

	for (const id in cart.items) {
		const product = products.getProduct(id);
		if (!product) {
			deleteItem(username, id);
			continue;
		}

		if (cart.items[id].inventory !== product.inventory) {
			cart.items[id] = { ...cart.items[id], inventory: product.inventory };
		}
		if (cart.items[id].quantity > product.inventory) {
			const newQuantity = product.inventory;
			const newSubTotal = cart.items[id].price * newQuantity;
			cart.items[id] = { ...cart.items[id], quantity: newQuantity, subtotal: parseFloat(newSubTotal.toFixed(2)) };
		}
	}
	updateTotalValuesFor(username);
}

function deleteItem(username, id) {
	delete carts[username].items[id];
	updateTotalValuesFor(username);
}

export default {
	makeCartFor,
	getCart,
	addItem,
	deleteCartFor,
	updateItemQuantity,
	checkInventory,
	deleteItem,
};