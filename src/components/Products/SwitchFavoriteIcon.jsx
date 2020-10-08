import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const SwitchFavoriteIcon = (props) => {
	return (
        <>
		{props.favorite === true ? (
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
                }}
            >
                <FavoriteBorderIcon />
            </IconButton>
        )}
        </>
	);
};
export default SwitchFavoriteIcon;
