import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import { db } from "../../firebase/index";
// import { SwitchFavoriteIcon } from "./index";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
	iconCell: {
		padding: 0,
		height: 48,
		width: 48,
	},
});

const SizeTable = (props) => {
	const classes = useStyles();
	const sizes = props.sizes;
	const id = props.id;

	console.log("id:" + props.id);
	console.log("props.favorite:" + props.favorite);

	const [favorite, setFavorite] = useState(props.favorite);

	const dataF = favorite;

	// const changeFavorite = (id) => {
	// 	db.collection("products").doc(id).update({ favorite: dataF });
	// };

	// useEffect(() => {
	// 	//trueの時はadd
	// 	if (setFavorite === true) {
	// 		// changeFavorite(id);
	// 		console.log("add");
	// 	} else {
	// 		console.log("remove");
	// 	}
	// }, [favorite]);

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
									{props.favorite === true ? (
										<IconButton
											onClick={() => {
												setFavorite(!favorite);
												console.log("remove");
											}}
										>
											<FavoriteIcon color='error' />
										</IconButton>
									) : (
										<IconButton
											onClick={() => {
												setFavorite(!favorite);
												console.log("add");
												props.changeFavorite(size.size);
											}}
										>
											<FavoriteBorderIcon />
										</IconButton>
									)}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default SizeTable;
