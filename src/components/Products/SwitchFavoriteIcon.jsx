import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const SwitchFavoriteIcon = (props) => {
	// console.log("size:" + props.size.size);
	return (
		<>
			{props.favorite === true ? (
				<IconButton
					onClick={() => {
						props.setFavorite(!props.favorite);
						props.deleteFavorite();
					}}
				>
					<FavoriteIcon color='error' />
				</IconButton>
			) : (
				<IconButton
					onClick={() => {
						props.setFavorite(!props.favorite);
						props.addFavorite();
					}}
				>
					<FavoriteBorderIcon />
				</IconButton>
			)}
		</>
	);
};
export default SwitchFavoriteIcon;
