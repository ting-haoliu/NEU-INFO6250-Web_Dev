import { VIEWS } from '../constants';
import '../styles/Header.css';

function Header({
	className = 'header',
	username,
	currentPage,
	onClickLogin,
	onClickProducts,
	onClickCart,
	cartItemsCount,
	onLogout
}) {
	let banned;
	if (className === "header__banned") {
		banned = "This account is blocked. You can just view the products";
	}

	return (
		<div className={className}>
			<h3>Fake Store</h3>
			{banned && <p>{banned}</p>}
			<div className="header__right">
				{username && !banned &&
					<div className="username">
						<span>Hello, {username}</span>
					</div>}
				<div className="header__buttons">
					{onClickLogin && currentPage !== VIEWS.LOGIN &&
						<button onClick={onClickLogin} className="button__login">Login</button>}
					{onClickProducts &&
						<button onClick={onClickProducts} className="button__products">Products</button>}
					{onClickCart &&
						<button onClick={onClickCart} className="button__cart">Cart ({cartItemsCount})</button>}
					{onLogout &&
						<button onClick={onLogout} className="button__logout">Logout</button>}
				</div>
			</div>
		</div>
	);
}

export default Header;