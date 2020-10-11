import React, { useState, useEffect, useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { db } from "../../firebase/index";
import { SwitchFavoriteIcon } from "./index";
import { getUserId } from "../../reducks/users/selectors";
import { addFavoriteToList } from "../../reducks/products/operations";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
	iconCell: {
		padding: 0,
		height: 48,
		width: 48,
	},
});

const SizeTable = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	const sizes = props.sizes;
	const id = props.id;

	//addfavorite
	const [favorite, setFavorite] = useState();
	const [favoriteSize, setFavoriteSize] = useState("");

	const uid = getUserId(selector);

	useEffect(() => {
		db.collection("users")
			.doc(uid)
			.collection("favo")
			.doc(id)
			.get()
			.then((doc) => {
				const data = doc.data();
				if (data !== "") {
					const favoFavorite = data.favorite;
					const favoSize = data.sizes;
					setFavorite(favoFavorite);
					setFavoriteSize(favoSize);
				} else {
					db.collection("products")
						.doc(id)
						.get()
						.then((doc) => {
							const data = doc.data();
							const productFavorite = data.favorite;
							setFavorite(productFavorite);
						});
				}
			})
			.catch(() => {
				db.collection("products")
					.doc(id)
					.get()
					.then((doc) => {
						const data = doc.data();
						const productFavorite = data.favorite;
						setFavorite(productFavorite);
					});
			});
	}, []);

	const addFavorite = useCallback((selectedSize) => {
		console.log("addFavorite開始");
		console.log("favoriteSize:" + favoriteSize);
		db.collection("products")
			.doc(id)
			.get()
			.then((doc) => {
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

	//deleteFavorite
	const deleteFavorite = useCallback(() => {
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
		<TableContainer>
			<Table>
				<TableBody>
					{sizes.length > 0 &&
						sizes.map((size) => (
							<TableRow key={size.size}>
								<TableCell component='th' scope='row'>
									{size.size}
								</TableCell>
								<TableCell>残り{size.quantity}点</TableCell>
								<TableCell className={classes.iconCell}>
									{size.quantity > 0 ? (
										<IconButton onClick={() => props.addProduct(size.size)}>
											<ShoppingCartIcon />
										</IconButton>
									) : (
										<div>売切</div>
									)}
								</TableCell>
								<TableCell className={classes.iconCell}>
									<SwitchFavoriteIcon
										addFavorite={addFavorite}
										favorite={favorite}
										setFavorite={setFavorite}
										deleteFavorite={deleteFavorite}
										setFavoriteSize={setFavoriteSize}
										favoriteSize={favoriteSize}
										size={size}
										onClick={() => {
											setFavoriteSize(size.size);
										}}
									/>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default SizeTable;
