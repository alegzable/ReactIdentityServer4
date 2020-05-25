import axios from "axios";
import { User, UserManager } from "oidc-client";

export const setDefaultAuthorizationHeader = (user: User) => {
	setAuthorizationHeader(axios.defaults.headers.common, user);
};

export const setAuthInterceptors = (user: User, userManager: UserManager) => {
	axios.interceptors.response.use(
		(r) => r,
		(error) => {
			if (error.response) {
				var axiosRequestConfig = error.response.config;

				if (error.response.status === 401) {
					if (user && user.expires_in > 10) {
						return setAuthorizationHeadersAndRetryRequest(user, axiosRequestConfig);
					}

					return userManager.signinSilent().then((user) => {
						return setAuthorizationHeadersAndRetryRequest(user, axiosRequestConfig);
					});
				}
			}

			console.log(error);

			return Promise.reject(error);
		}
	);
};

const setAuthorizationHeader = (headers: any, user: User) => {
	headers["Authorization"] = "Bearer " + user.access_token;
};

const setAuthorizationHeadersAndRetryRequest = (user: User, axiosRequestConfig: any) => {
	setDefaultAuthorizationHeader(user);
	setAuthorizationHeader(axiosRequestConfig.headers, user);

	return axios(axiosRequestConfig);
};
