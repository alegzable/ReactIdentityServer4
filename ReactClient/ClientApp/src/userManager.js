import { makeUserManager } from "react-oidc";
import userManagerConfig from "./userManagerConfig";
import { setDefaultAuthorizationHeader } from "./axiosUtils";

const userManager = makeUserManager(userManagerConfig);

userManager.events.addAccessTokenExpiring(() => {
	userManager
		.signinSilent()
		.then((user) => {
			setDefaultAuthorizationHeader(user);
		})
		.catch((error) => {
			console.log(`Silent signing failed. ${error}`);
		});
});

export default userManager;
