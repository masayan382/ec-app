import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/list";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products";
import { GreyButton, PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
	root: {
		margin: "0 auto",
		maxWidth: 512,
		width: "100%",
	},
});

const CartList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	const productsInCart = getProductsInCart(selector);

	const goToOrder = useCallback(() => {
		dispatch(push("/order/confirm"));
	}, []);

	const backToHome = useCallback(() => {
		dispatch(push("/"));
	});

	return (
		<section className='c-section-wrapin'>
			<h2 className='u-text__headline'>ショッピングカート</h2>
			<List className={classes.root}>
				{productsInCart.length > 0 &&
					productsInCart.map((product) => (
						<CartListItem key={product.carId} product={product} />
					))}
			</List>
			<div className='module-spacer--medium' />
			<div className='p-grid__column'>
				<PrimaryButton label={"レジへ進む"} onClic={goToOrder} />
				<div className='module-spacer--extra-extra-small'></div>
				<GreyButton label={"ショッピングを続ける"} onClic={backToHome} />
			</div>
		</section>
	);
};

export default CartList;
