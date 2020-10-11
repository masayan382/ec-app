import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const SwitchFavoriteIcon = (props) => {
	// console.log("props.favorite:" + props.favorite);
	// console.log("props.size.size:" + props.size.size);
	// console.log("props.favoriteSize:" + props.favoriteSize);
	return (
		<>
			{props.size.size === props.favoriteSize && props.favorite === true ? (
				<IconButton
					onClick={() => {
						console.log("delete");
						props.setFavorite(!props.favorite);
						props.deleteFavorite();
					}}
				>
					<FavoriteIcon color='error' />
				</IconButton>
			) : (
				<IconButton
					onClick={() => {
						console.log("add");
						props.setFavorite(!props.favorite);
						props.addFavorite(props.size.size);
						props.setFavoriteSize(props.size.size);
					}}
				>
					<FavoriteBorderIcon />
				</IconButton>
			)}
		</>
	);
};
export default SwitchFavoriteIcon;
