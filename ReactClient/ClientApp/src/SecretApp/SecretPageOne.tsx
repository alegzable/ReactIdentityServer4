import React, { useState } from "react";
import axios from "axios";
import urls from "../urls";

const SecretPageOne = () => {
	const [secretMessage, setSecretMessage] = useState<string | undefined>(undefined);

	const getSecretMessage = async () => {
		setSecretMessage("Fetching Secret Message...");

		const response = await axios.get(urls.apiSecret);

		setSecretMessage(response.data);
	};

	return (
		<>
			<h2>Secret Page One</h2>
			<div>
				<button type="button" onClick={getSecretMessage}>
					Get Secret Message from Api
				</button>
			</div>
			<span>{secretMessage}</span>
		</>
	);
};

export default SecretPageOne;
