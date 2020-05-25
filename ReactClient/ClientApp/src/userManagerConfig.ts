import { WebStorageStateStore, Log } from "oidc-client";
import urls from "./urls";

const userManagerConfig = {
	authority: urls.authority,
	client_id: "client_id",
	redirect_uri: urls.redirectUri,
	silent_redirect_uri: urls.silentRedirectUri,
	post_logout_redirect_uri: urls.postLogoutRedirectUri,
	response_type: "code",
	scope: "openid Api",
	userStore: new WebStorageStateStore({ store: window.localStorage }),
} as const;

Log.logger = console;
Log.level = Log.INFO;

export default userManagerConfig;
