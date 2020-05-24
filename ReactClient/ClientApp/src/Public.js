import React from "react";
import userManager from "./userManager";

const Public = () => {
	return (
		<>
			<h2>Public Page</h2>
			<button onClick={() => userManager.signinRedirect()}>Sign In</button>
		</>
	);
};

export default Public;
