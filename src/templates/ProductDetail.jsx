import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db, FirebaseTimestamp } from "../firebase/index";
import { makeStyles } from "@material-ui/styles";
import HTMLReactParser from "html-react-parser";
import { ImageSwiper, SizeTable } from "../components/Products";
import { addProductToCart } from "../reducks/users/operations";
import { changeFavoriteState } from "../reducks/users/operations";
import { getUserId } from "../reducks/users/selectors";
import { addFavoriteToList } from "../reducks/products/operations";

const useStyles = makeStyles((theme) => ({
	sliderBox: {
		[theme.breakpoints.down("sm")]: {
			margin: "0 auto 24px auto",
			height: 320,
			width: 320,
		},
		[theme.breakpoints.up("sm")]: {
			margin: "0 auto",
			height: 400,
			width: 400,
		},
	},
	detail: {
		textAlign: "left",
		[theme.breakpoints.down("sm")]: {
			margin: "0 auto 24px auto",
			height: "auto",
			width: 320,
		},
		[theme.breakpoints.up("sm")]: {
			margin: "0 auto",
			height: "auto",
			width: 400,
		},
		price: {
			fontSize: 36,
		},
	},
}));

const returnCodeToBr = (text) => {
	if (text === "") {
		return text;
	} else {
		return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
	}
};

const ProductDetail = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	const path = selector.router.location.pathname;
	const id = path.split("/product/")[1];

	const [product, setProduct] = useState(null);

	useEffect(() => {
		db.collection("products")
			.doc(id)
			.get()
			.then((doc) => {
				const data = doc.data();
				setProduct(data);
			});
	}, []);

	const addProduct = useCallback(
		(selectedSize) => {
			const timestamp = FirebaseTimestamp.now();
			dispatch(
				addProductToCart({
					added_at: timestamp,
					description: product.description,
					gender: product.gender,
					images: product.images,
					name: product.name,
					price: product.price,
					id: product.id,
					quantity: 1,
					size: selectedSize,
					favorite: favorite,
				})
			);
		},
		[product]
	);

	//addfavorite
	const [favorite, setFavorite] = useState();
	const uid = getUserId(selector);

	useEffect(() => {
		db.collection("users")
			.doc(uid)
			.collection("favo")
			.doc(id)
			.get()
			.then((doc) => {
				const data = doc.data();
				const favoFavorite = data.favorite;
				setFavorite(favoFavorite);
				console.log("初回favoFavorite:" + favoFavorite);
			})
			.catch(() => {
				db.collection("products")
					.doc(id)
					.get()
					.then((doc) => {
						const data = doc.data();
						const productFavorite = data.favorite;
						setFavorite(productFavorite);
						console.log("初回productFavorite:" + productFavorite);
					});
			});
	}, []);

	const addFavorite = useCallback((selectedSize) => {
		console.log("addFavorite開始");
		console.log("id:" + id);
		db.collection("products")
			.doc(id)
			.get()
			.then(async (doc) => {
				const data = doc.data();
				dispatch(
					addFavoriteToList({
						id: data.id,
						name: data.name,
						description: data.description,
						category: data.category,
						gender: data.gender,
						price: data.price,
						images: data.images,
						sizes: selectedSize,
						favorite: true,
						created_at: data.created_at,
					})
				);
				console.log("addFavorites終了");
			});
	}, []);

	// const changeFavorite = useCallback(() => {
	// 	console.log("changeFavorite開始");
	// 	dispatch(
	// 		changeFavoriteState({
	// 			id: id,
	// 			favorite: true,
	// 		})
	// 	);
	// }, []);

	//deleteFavorite
	const deleteFavorite = useCallback(() => {
		console.log("deleteFavorite開始");
		db.collection("users")
			.doc(uid)
			.collection("favo")
			.doc(id)
			.delete()
			.then(() => {
				console.log("delete成功");
				setFavorite(false);
			});
	}, []);

	return (
		<section className='c-section-wrapin'>
			{product && (
				<div className='p-grid__row'>
					<div className={classes.sliderBox}>
						<ImageSwiper images={product.images} />
					</div>
					<div className={classes.detail}>
						<h2 className='u-text__headline'>{product.name}</h2>
						<p className={classes.price}>
							{"￥" + product.price.toLocaleString()}
						</p>
						<div className='module-spacer--small' />
						<SizeTable
							addProduct={addProduct}
							sizes={product.sizes}
							// changeFavorite={changeFavorite}
							addFavorite={addFavorite}
							id={product.id}
							favorite={favorite}
							setFavorite={setFavorite}
							deleteFavorite={deleteFavorite}
						/>
						<div className='module-spacer--small' />
						<p>{returnCodeToBr(product.description)}</p>
					</div>
				</div>
			)}
		</section>
	);
};

export default ProductDetail;
