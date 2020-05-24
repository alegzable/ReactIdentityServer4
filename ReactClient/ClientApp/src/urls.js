const clientBaseUrl = "https://localhost:44339/";
const apiBaseUrl = "https://localhost:44325/";

const urls = {
	authority: "https://localhost:44355/",
	redirectUri: `${clientBaseUrl}callback`,
	silentRedirectUri: `${clientBaseUrl}silent-callback`,
	postLogoutRedirectUri: clientBaseUrl,
	apiSecret: `${apiBaseUrl}secret`,
};

export default urls;
