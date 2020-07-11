import { createStore as reduxCreateStore, combineReducers } from "redux";

// Import reducers
// import { ProductsReducer } from "../users/reducers";
import { UsersReducer } from "../users/reducers";

// createStoreの再定義 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore() {
	return reduxCreateStore(
		// オリジナル createStore の別名
		combineReducers({
			// products: ProductsReducer,
			users: UsersReducer,
		})
	);
}
