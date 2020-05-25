import React, { useContext } from "react";
import SecretPageOne from "./SecretPageOne";
import SecretPageTwo from "./SecretPageTwo";
import { Route, NavLink } from "react-router-dom";
import { UserData } from "react-oidc";

const SecretApp = () => {
	const userData = useContext(UserData);

	return (
		<>
			<h1>Secret App</h1>
			<nav>
				<ul>
					<li>
						<NavLink to="secret-page-one" activeStyle={{ color: "red" }}>
							Secret Page One
						</NavLink>
					</li>
					<li>
						<NavLink to="secret-page-two" activeStyle={{ color: "red" }}>
							Secret Page Two
						</NavLink>
					</li>
					<li>
						<button onClick={() => userData?.userManager?.signoutRedirect()}>Sign Out</button>
					</li>
				</ul>
			</nav>
			<div>
				<Route path="/secret-page-one" component={SecretPageOne} />
				<Route path="/secret-page-two" component={SecretPageTwo} />
			</div>
		</>
	);
};

export default SecretApp;
