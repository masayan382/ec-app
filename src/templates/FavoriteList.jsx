import React, {useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/list";
import { getProductsInCart } from "../reducks/users/selectors";
import { FavoriteListItem } from "../components/Products";
import { GreyButton, PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";
import { getUserId } from "../reducks/users/selectors";

const useStyles = makeStyles({
	root: {
		margin: "0 auto",
		maxWidth: 512,
		width: "100%",
	},
});

const FavoriteList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	// const selector = useSelector((state) => state);
    // const productsInCart = getProductsInCart(selector);
    const [favorite, setFavorite] = useState();
    const uid = getUserId(selector);

    useEffect(()=>{
        db.collection("users")
			.doc(uid)
			.collection("favo")
			.get()
			.then((doc) => {
				const data = doc.data();
				const favoFavorite = data.favorite;
				setFavorite(favoFavorite);
			})
    },[])

	const goToDetail = useCallback(() => {
		dispatch(push("/product/:"+favoFavorite.id));
	}, []);

	const backToHome = useCallback(() => {
		dispatch(push("/"));
	});

	return (
		<section className='c-section-wrapin'>
			<h2 className='u-text__headline'>お気に入り一覧</h2>
			<List className={classes.root}>
				{favorite.length > 0 &&
					FavoriteList.map((favorite) => (
						<FavoriteListItem key={favorite.favoId} favorite={favorite}/>
					))}
			</List>
			<div className='module-spacer--medium' />
			<div className='p-grid__column'>
				<PrimaryButton label={"商品詳細ページへ"} onClick={goToDetail} />
				<div className='module-spacer--extra-extra-small'></div>
				<GreyButton label={"ＴＯＰページへ戻る"} onClick={backToHome} />
			</div>
		</section>
	);
};

export default FavoriteList;
