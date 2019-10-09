import axios from "axios";
axios.defaults.baseURL = process.env.SERVER_URL || "http://localhost:8000";

export default function geocodeConv(address) {
	// console.log(address);
	const options = {
		method: "GET",
		url: `/api/geocode/${address}`
	};
	return axios(options)
		.then(response => {
			console.log(response.data); // we need the response.data value
			// const taxis = [];
			return response.data;
		})
		.catch(error => console.error(error));
}
