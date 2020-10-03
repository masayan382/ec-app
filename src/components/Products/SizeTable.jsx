import React, { useState, useEffect } from "react";
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

	const [favorite, setFavorite] = useState(props.favorite);

	const dataF = favorite;

	const changeFavorite = (id) => {
		db.collection("products").doc(id).update({ favorite: dataF });
	};

	useEffect(() => {
		if (favorite !== setFavorite) {
			changeFavorite(id);
		}
	}, [favorite]);

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
								<TableCell
									className={classes.iconCell}
									onClick={() => {
										setFavorite(!favorite);
									}}
								>
									<SwitchFavoriteIcon favorite={favorite} />
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default SizeTable;
