import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStore from "./reducks/store/store";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./assets/theme";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import createBrowserHistory from "history/createBrowserHistory";

// const history = History.createBrowserHistory();
const history = createBrowserHistory({ basename: "/monoqlo" });

export const store = createStore(history);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<MuiThemeProvider theme={theme}>
				<App />
			</MuiThemeProvider>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
