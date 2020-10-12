import React from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { db } from "../../firebase/index";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
	list: {
		height: 128,
	},
	image: {
		objectFit: "cover",
		margin: 16,
		height: 96,
		width: 96,
	},
	text: {
		width: "100%",
	},
}));

const FavoriteListItem = (props) => {
	const classes = useStyles();
	const selector = useSelector((state) => state);
	const uid = getUserId(selector);
	const image = props.favorite.images[0].path;
	const name = props.favorite.name;
	const price = props.favorite.price.toLocaleString();
	// const size = props.favorite.size;

	const deleteFavorite = (id) => {
		return db.collection("users").doc(uid).collection("favo").doc(id).delete();
	};
	console.log("props.favoListLength:" + props.favoListLength);
	return (
		<>
			<ListItem className={classes.list} onClick={()=>{
                props.goToDetail(props.favorite.favoId);
            }}>
				<ListItemAvatar>
					<img className={classes.image} src={image} alt='商品画像' />
				</ListItemAvatar>
				<div className={classes.text}>
					<ListItemText primary={name} />
					<ListItemText primary={"¥" + price} />
				</div>
				<IconButton
					onClick={() => {
						deleteFavorite(props.favorite.favoId);
						props.favoriteNewList();
					}}
				>
					<FavoriteIcon color='error' />
				</IconButton>
			</ListItem>
			<Divider />
		</>
	);
};

export default FavoriteListItem;
