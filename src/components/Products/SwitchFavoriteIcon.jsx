import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const SwitchFavoriteIcon = (props) => {
	return (
		<IconButton>
			{props.favorite === true ? (
				<FavoriteIcon color='error' />
			) : (
				<FavoriteBorderIcon />
			)}
		</IconButton>
	);
};
export default SwitchFavoriteIcon;
