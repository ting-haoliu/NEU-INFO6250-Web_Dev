import { useReducer, useEffect } from 'react';
import './App.css';
import {
	REDIRECTING_DELAY,
	LOGIN_STATUS,
	VIEWS,
	SERVER,
	CLIENT,
	ACTIONS,
	PERMISSIONS,
} from './constants.js';

import reducer, { initialState } from './reducer';

import * as services from './services';
import LoginForm from './components/LoginForm';
import Cart from './components/Cart';
import Products from './components/Products';
import Loading from './components/Loading';
import Error from './components/Error';
import Header from './components/Header';


function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	function onLogin(username) {
		dispatch({ type: ACTIONS.LOGIN_PENDING });

		services.fetchLogin(username)
			.then(response => {
				dispatch({ type: ACTIONS.LOG_IN, username: response.username, permission: response.permission });
				return services.fetchCart(); // Update the cartItemsCount for Cart(0) shown on the Header
			})
			.catch(err => {
				if (err?.error === SERVER.NO_PERMISSION) {
					return Promise.reject({ error: CLIENT.BANNED_USER });
				}
				return Promise.reject(err);
			})
			.then(response => {
				dispatch({ type: ACTIONS.REPLACE_CART, cart: response.cart });
			})
			.catch(err => {
				if (err?.error === CLIENT.BANNED_USER) {
					dispatch({ type: ACTIONS.LOG_IN, username, permission: PERMISSIONS.BANNED });
					return;
				}
				dispatch({ type: ACTIONS.LOG_OUT });//Login failed due to unknown reason
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
	}

	function onLogout() {
		dispatch({ type: ACTIONS.LOGGING_OUT });
		services.fetchLogout()
			.then(() => {
				dispatch({ type: ACTIONS.LOG_OUT });
				return services.fetchProducts(); // Update and show the products view
			})
			.catch(err => {
				return Promise.reject(err);
			})
			.then(response => {
				dispatch({ type: ACTIONS.REPLACE_PRODUCTS, products: response.productsList });
			})
			.catch(err => {
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
	}

	function onClickLogin() {
		dispatch({ type: ACTIONS.CLICK_LOGIN });
	}

	function onClickCart() {
		if (state.lastOrderId) {//The page is showing the message for ordered successfully
			return; // Ignore this click action, waiting for redirecting
		}
		dispatch({ type: ACTIONS.LOADING_PAGE, isPageLoading: true });//Show loading indicator...

		services.fetchCart()
			.then(response => {
				dispatch({ type: ACTIONS.CLICK_CART, cart: response.cart });
			})
			.catch(err => {
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({ type: ACTIONS.TIMED_OUT });
					return;
				}
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({ type: ACTIONS.LOG_OUT });
					// Not yet logged in isn't a reported error
					return;
				}
				// For unexpected errors, report them
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });// Ensure that the error ends up truthy
			})
			.finally(() => {
				dispatch({ type: ACTIONS.LOADING_PAGE, isPageLoading: false });// Hide loading indicator
			});
	}

	function onClickProducts() {
		if (state.lastOrderId) { //The page is showing the message for ordered successfully
			return; // Ignore this click action, waiting for redirecting
		}
		dispatch({ type: ACTIONS.LOADING_PAGE, isPageLoading: true });//Show loading indicator...
		services.fetchProducts()
			.then(response => {
				dispatch({ type: ACTIONS.CLICK_PRODUCTS, products: response.productsList });
			})
			.catch(err => {
				// For unexpected errors, report them
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			})
			.finally(() => {
				dispatch({ type: ACTIONS.LOADING_PAGE, isPageLoading: false });// Hide loading indicator
			});
	}

	function onAddToCart(id) {
		services.fetchAddItem(id, 1)
			.then(response => {
				dispatch({ type: ACTIONS.REPLACE_CART, cart: response.cart });
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({ type: ACTIONS.LOG_OUT });
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({ type: ACTIONS.TIMED_OUT });
					return;
				}
				if (err?.error === SERVER.NO_SUCH_PRODUCT) {
					dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error });
					return services.fetchProducts();
				}
				return Promise.reject(err);
			})
			.then(response => {
				if (response?.productsList) {
					dispatch({ type: ACTIONS.REPLACE_PRODUCTS, products: response?.productsList });
				}
			}).catch(err => {
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
	}

	function onChangeQuantity(id, quantity) {
		services.fetchSetItemQuantity(id, quantity)
			.then(response => {
				dispatch({ type: ACTIONS.REPLACE_CART, cart: response.cart });
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) { // expected "error"
					dispatch({ type: ACTIONS.LOG_OUT });
					// Not yet logged in isn't a reported error
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({ type: ACTIONS.TIMED_OUT });
					return;
				}
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
	}

	function onDeleteFromCart(id) {
		services.fetchDeleteItem(id)
			.then(response => {
				dispatch({ type: ACTIONS.CLICK_CART, cart: response.cart });
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) {
					dispatch({ type: ACTIONS.LOG_OUT });
					return;
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					dispatch({ type: ACTIONS.TIMED_OUT });
					return;
				}
				if (err?.error === SERVER.NO_SUCH_PRODUCT) {
					dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error });
					return;
				}
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
	}

	function onCheckOut() {
		dispatch({ type: ACTIONS.START_CHECKING_OUT });
		services.fetchMakeOrder()
			.then(response => {
				dispatch({ type: ACTIONS.CHECKING_OUT, orderId: response.orderId, cart: response.cart });
				dispatch({ type: ACTIONS.AFTER_CHECK_OUT }); // Clear flags
				setTimeout(() => { // Redirect to home page
					dispatch({ type: ACTIONS.SHOW_HOMEPAGE });
				}, REDIRECTING_DELAY);
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) {
					return Promise.reject({ error: CLIENT.NO_SESSION })
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					return Promise.reject({ error: CLIENT.SESSION_TIMEOUT });
				}
				if (err?.error === SERVER.NO_SUCH_PRODUCT) {
					dispatch({ type: ACTIONS.REPORT_ERROR, error: err.error });
					return services.fetchCart(); // Update the shopping cart
				}
				return Promise.reject(err);
			}).then(response => {
				if (response?.cart) {
					dispatch({ type: ACTIONS.REPLACE_CART, cart: response.cart });
				}
			}).catch(err => {
				if (err?.error === CLIENT.NO_SESSION) {
					dispatch({ type: ACTIONS.LOG_OUT });
					return;
				}
				if (err?.error === CLIENT.SESSION_TIMEOUT) {
					dispatch({ type: ACTIONS.TIMED_OUT });
					return;
				}
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
	}

	function checkSession() {
		services.fetchCheckSession()
			.then(response => {
				dispatch({ type: ACTIONS.LOG_IN, username: response.username, permission: response.permission });
				return services.fetchCart(); // to show how many items in the Cart
			})
			.catch(err => {
				if (err?.error === SERVER.AUTH_MISSING) {
					return Promise.reject({ error: CLIENT.NO_SESSION }); // Not an error but just the user is not logged in yet
				}
				if (err?.error === SERVER.NO_PERMISSION) {
					return Promise.reject({ error: CLIENT.BANNED_USER });
				}
				if (err?.error === SERVER.SESSION_EXPIRED) {
					return Promise.reject({ error: CLIENT.SESSION_TIMEOUT });
				}
				return Promise.reject(err);
			})
			.then(response => {
				dispatch({ type: ACTIONS.REPLACE_CART, cart: response.cart });
			})
			.catch(err => {
				if (err?.error === CLIENT.NO_SESSION) {
					dispatch({ type: ACTIONS.LOG_OUT });
					return;
				}
				if (err?.error === CLIENT.SESSION_TIMEOUT) {
					dispatch({ type: ACTIONS.TIMED_OUT });
					return;
				}
				if (err?.error === CLIENT.BANNED_USER) {
					dispatch({ type: ACTIONS.LOG_IN, username: '', permission: PERMISSIONS.BANNED });
					return;
				}
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
	}

	// On initial page loading
	useEffect(() => {
		services.fetchProducts()
			.then(response => {
				dispatch({ type: ACTIONS.REPLACE_PRODUCTS, products: response.productsList });
			})
			.catch(err => {
				dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
			});
		checkSession();
	}, []);

	return (
		<div className="app">
			<main className="main">
				{state.error && <Error error={state.error} />}
				{state.loginStatus === LOGIN_STATUS.PENDING &&
					<Loading className="login__waiting">Loading site...</Loading>}
				{state.loginStatus === LOGIN_STATUS.LOGGING_OUT &&
					<Loading className="logging_out">Logging out...</Loading>}
				{state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
					<>
						<Header className="header__not_login"
							onClickLogin={onClickLogin}
							currentPage={state.currentPage}
						/>
						{state.currentPage === VIEWS.PRODUCTS &&
							<Products
								className="products__not_login"
								isPageLoading={state.isPageLoading}
								products={state.products}
							/>
						}
						{state.currentPage === VIEWS.LOGIN && <LoginForm onLogin={onLogin} />}
					</>
				)}
				{state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_BANNED && (
					<>
						<Header className="header__banned"
							username={state.username}
							onLogout={onLogout}
						/>
						<Products
							className="products__banned"
							isPageLoading={state.isPageLoading}
							products={state.products}
						/>
					</>
				)}
				{state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN_USER && (
					<>
						<Header
							username={state.username}
							onClickProducts={onClickProducts}
							onClickCart={onClickCart}
							cartItemsCount={state.cartItemsCount}
							onLogout={onLogout}
						/>
						{state.currentPage === VIEWS.PRODUCTS &&
							<Products
								className="products__user"
								isPageLoading={state.isPageLoading}
								products={state.products}
								onAddToCart={onAddToCart}
							/>}
						{state.currentPage === VIEWS.CART &&
							<Cart
								isPageLoading={state.isPageLoading}
								isCheckingOut={state.isCheckingOut}
								cart={state.cart}
								onChangeQuantity={onChangeQuantity}
								onDeleteFromCart={onDeleteFromCart}
								onCheckOut={onCheckOut}
								lastOrderId={state.lastOrderId}
							/>
						}
					</>
				)}
			</main>
		</div>
	);
}

export default App;