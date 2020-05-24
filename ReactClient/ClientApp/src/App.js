import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { makeAuthenticator, Callback } from "react-oidc";
import Public from "./Public";
import Loader from "./Loader";
import SecretApp from "./SecretApp/SecretApp";
import SilentCallback from "./SilentCallback";
import userManager from "./userManager";
import { setDefaultAuthorizationHeader, setAuthInterceptors } from "./axiosUtils";

const SecretAppWithAuth = makeAuthenticator({
	userManager: userManager,
	placeholderComponent: <Loader />,
})(SecretApp);

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Public} />
				<Route path="/silent-callback" component={SilentCallback} />
				<Route
					path="/callback"
					render={(routeProps) => (
						<Callback
							onSuccess={(user) => {
								setAuthInterceptors(user, userManager);
								setDefaultAuthorizationHeader(user);

								routeProps.history.push("/secret-page-one");
							}}
							onError={(error) => {
								console.log(`Authorization failed. ${error}`);
							}}
							userManager={userManager}
						/>
					)}
				/>
				<SecretAppWithAuth />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
