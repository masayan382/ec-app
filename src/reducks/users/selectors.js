import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getSignedIn = createSelector(
	[usersSelector],
	(state) => state.isSignedIn
);

export const getOrdersHistory = createSelector(
	[usersSelector],
	(state) => state.orders
);

export const getProductsInCart = createSelector(
	[usersSelector],
	(state) => state.cart
);

export const getFavoriteInList = createSelector(
	[usersSelector],
	(state) => state.favorite
);

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUserName = createSelector(
	[usersSelector],
	(state) => state.username
);

export const getUserEmail = createSelector(
	[usersSelector],
	(state) => state.email
);
