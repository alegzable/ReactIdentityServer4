import React from "react";
import { UserManager } from "oidc-client";

const SilentCallback = () => {
	const userManager = new UserManager();
	userManager.signinSilentCallback().catch((error) => {
		console.error(`Silent signing callback failed. ${error}`);
	});

	return <></>;
};

export default SilentCallback;
