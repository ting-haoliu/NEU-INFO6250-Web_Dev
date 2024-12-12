import Loading from './Loading';
import Product from './Product';
import { SHOW } from '../constants';
import '../styles/Products.css';

function Products({
	className = "products",
	isPageLoading,
	products,
	onAddToCart,
}) {
	const productsCount = Object.keys(products).length;
	let show;
	if (isPageLoading) {
		show = SHOW.PENDING;
	} else if (!productsCount) {
		show = SHOW.EMPTY;
	} else {
		show = SHOW.CONTENT;
	}

	return (
		<div className="content">
			{show === SHOW.PENDING && <Loading className="products__waiting"></Loading>}
			{show === SHOW.EMPTY &&
				<>
					<p className="products__empty">No product for sell.</p>
				</>
			}
			{show === SHOW.CONTENT && (
				<>
					<h2 className="product__header">Products</h2>
					<ul className={className}>
						{Object.values(products).map(product => (
							<li className="product" key={product.id}>
								<Product
									product={product}
									onAddToCart={onAddToCart}
								/>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}

export default Products;