import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/list";
import { getFavoriteInList } from "../reducks/users/selectors";
import { FavoriteListItem } from "../components/Products";
import { GreyButton, PrimaryButton } from "../components/UIkit";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";
import { db } from "../firebase";
import { getUserId } from "../reducks/users/selectors";
import { fetchFavoriteInList } from "../reducks/users/operations";

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
	const selector = useSelector((state) => state);
	const uid = getUserId(selector);
	let favoriteList = getFavoriteInList(selector);
	const [favoListLength, setFavoiteListLength] = useState();
	let favoriteInList = getFavoriteInList(selector);

	useEffect(() => {
		const favoriteListLength = favoriteList.length;
		console.log(favoriteListLength);
		setFavoiteListLength(favoriteListLength);
		console.log("FavoriteListのuseEffect");
	}, []);

	const favoriteNewList = useCallback(() => {
		db.collection("users")
			.doc(uid)
			.collection("favo")
			.onSnapshot((snapshots) => {
				snapshots.docChanges().forEach((change) => {
					const favoriteNewData = change.doc.data();
					console.dir(favoriteNewData);
					favoriteList.push(favoriteNewData);
				});
				dispatch(fetchFavoriteInList(favoriteList));
				console.log("favoriteList:" + favoriteList);
				console.dir(favoriteList);
			});
	}, []);

	const goToDetail = useCallback((id) => {
		dispatch(push("/product/" + id));
	}, []);

	const backToHome = useCallback(() => {
		dispatch(push("/"));
	});

	return (
		<section className='c-section-wrapin'>
			<h2 className='u-text__headline'>お気に入り一覧</h2>
			<List className={classes.root}>
				{favoriteList.length > 0 &&
					favoriteList.map((favorite) => (
						<FavoriteListItem
							key={favorite.favoId}
							favorite={favorite}
							setFavoiteListLength={setFavoiteListLength}
							favoListLength={favoListLength}
							goToDetail={goToDetail}
							favoriteNewList={favoriteNewList}
						/>
					))}
			</List>
			<div className='module-spacer--medium' />
			<div className='p-grid__column'>
				{/* <PrimaryButton label={"商品詳細ページへ"} onClick={goToDetail} /> */}
				<div className='module-spacer--extra-extra-small'></div>
				<GreyButton label={"ＴＯＰページへ戻る"} onClick={backToHome} />
			</div>
		</section>
	);
};

export default FavoriteList;
