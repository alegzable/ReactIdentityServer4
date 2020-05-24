import axios from "axios";

export const setDefaultAuthorizationHeader = (user) => {
	setAuthorizationHeader(axios.defaults.headers.common, user);
};

export const setAuthInterceptors = (user, userManager) => {
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

const setAuthorizationHeader = (headers, user) => {
	headers["Authorization"] = "Bearer " + user.access_token;
};

const setAuthorizationHeadersAndRetryRequest = (user, axiosRequestConfig) => {
	setDefaultAuthorizationHeader(user);
	setAuthorizationHeader(axiosRequestConfig.headers, user);

	return axios(axiosRequestConfig);
};
