import {
	createStore as reduxCreateStore,
	combineReducers,
	applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

// Import reducers
// import { ProductsReducer } from "../products/reducers";
import { UsersReducer } from "../users/reducers";

// createStoreの再定義 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore(history) {
	return reduxCreateStore(
		combineReducers({
			router: connectRouter(history),
			users: UsersReducer,
		}),
		applyMiddleware(routerMiddleware(history), thunk)
	);
}
