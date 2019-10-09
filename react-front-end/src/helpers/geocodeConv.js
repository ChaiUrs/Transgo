import axios from "axios";
axios.defaults.baseURL = process.env.SERVER_URL || "http://localhost:8000";
const key = process.env.REACT_APP_APIKEY;

export default function geocodeConv(address) {
	// console.log(address);
	const options = {
		method: "GET",
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
	};
	return axios(options)
		.then(response => {
			// console.log(
			// 	"geocode address",
			// 	response.data.results[0].geometry.location
			// ); // we need the response.data value
			// const taxis = [];
			return response.data.results[0].geometry.location;
		})
		.catch(error => console.error(error));
}
