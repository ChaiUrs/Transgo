const express = require("express");
const router = express.Router();
const request = require("request");
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
const axios = require("axios");
const { closestMobiStn, gcDistanceMatrix } = require("../helper/gcDistanceMatrix");
db.connect().catch(error => console.error("Failed to connect to DB ", error));

const key = process.env.APIKEY;

const options = {
	method: "GET",
	url: "https://ridewithzoom.com/api/DriverPositions/",
	headers: {
		"cache-control": "no-cache",
		Connection: "keep-alive",
		"Accept-Encoding": "gzip, deflate",
		Host: "ridewithzoom.com",
		"Postman-Token":
			"483ad6eb-bb96-4b23-8301-d71e6e7d6f64,32791523-6e3a-4525-a914-aaa36f99e2e1",
		"Cache-Control": "no-cache",
		Accept: "*/*",
		"User-Agent": "PostmanRuntime/7.17.1",
		"application-key": "CD8C3673-507A-4164-9EB8-0BEEB572762F",
		Authorization:
			"Bearer oLVbxmeFV4GgTyZcZOU7xdDjvYJS2n9W54-WEKz74ZKCo20SR9q4c2CGjZx7uC-sA0068yJ6Htmm0k_s4zMQT6k49akqmlw11yeFWBxO-zLxDzKz3QdMhJ_mmHfNnL7XjFWbuSL7QUgMXByO4GPx7BSTLB-N0Dsr_pyvoLjv3AcObxpAUqASpK_cIaiXpxvr7dxSNdWS0sScjY6CVZ68ekctlhC2jlDhp-ONFDpyBf3Cec7iZt_GFUiCGCcEZjeiLJakZoZqvwCq-6bZIWLhYRQKR3hCFAAmb9UNncnRXb9VbCcaCtW8qS9MXfcQW7H5Da1zTaHkl4rswOl9DIFfv9wKLoSP0Rx7pEwLdfUz4bhkU03kPzRCTn5iQyHEyQQlD6xomxynj7SyyLSQO8KoQB7bsJvReJW6nw728BGtZoTQaoLH6WGiD7v-PvIJVcvceP-1SR0NZqh_E_JkbCDgSQ"
	}
};

const mobibikesStations = {
  'method': 'GET',
  'url': 'https://vancouver-ca.smoove.pro/api-public/stations',
  'headers': {
  }
};

module.exports = () => {
	router.post("/user", (req, res) => {
		db.query(`SELECT * FROM users WHERE name=$1 AND password=$2`, [
			req.body.name,
			req.body.password
		])
			.then(response => {
				res.send(response.rows);
			})
			.catch(err => {
				console.log(err);
			});
	});

	router.get("/user", (req, res) => {
		db.query(`SELECT * FROM users`)
			.then(response => {
				res.send(response.rows);
			})
			.catch(err => {
				console.log(err);
			});
	});

	router.get("/api/taxis", (req, res) => {
		request(
			options,
			function(error, response, body) {
				if (error) throw new Error(error);
				// console.log(body);
				res.send(body);
			}
		);
	});

	router.get("/api/places/:address", (req, res) => {
		const optionsGM = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params.address}&key=${key}`;
		const result = [];
		axios
			.get(optionsGM)
			.then(response => {
				console.log(response);
				res.send(response);
			})
			.catch(error => console.log(error));
	});

	router.get("/api/taxi/:address", (req, res) => {
		let taxis = {};
		
		request(options, function(error, response, body) {
			if (error) throw new Error(error);
			taxis = JSON.parse(body);
			// res.send(taxis.result);
			// console.log(taxis.result);
			const destinations = req.params.address;
			let origins = "";
			if (taxis.result.length >= 99) {
				console.log("over 99 taxis", taxis.result.length);
				for (let i = 0; i < 99; i++) {
					if (i === 0) {
						origins += `${taxis.result[i].lat},${taxis.result[i].long}`;
					} else {
						origins += `|${taxis.result[i].lat},${taxis.result[i].long}`;
					}
				}
			} else {
				console.log("less than 99 taxis", taxis.result.length);
				taxis.result.map((taxi, index) => {
					if (index === 0) {
						origins += `${taxi.lat},${taxi.long}`;
					} else {
						origins += `|${taxi.lat},${taxi.long}`;
					}
				});
			}
			// console.log(origins, destinations);
			// res.send(gcDistanceMatrix(origins,destinations,key,taxis));

			const optionsGM = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destinations}&key=${key}`;
			axios
				.get(optionsGM)
				.then(response => {
					// console.log(response);
					// res.send(response.data);
					// console.log("length taxis ", taxis.result.length);
					console.log("results from api ", response.data.rows.length);
					//
					// console.log(response);
					let min = response.data.rows[0].elements[0].distance.value;
					let taxiNum = 0;
					response.data.rows.map((taxiLoc, index) => {
						if (min > taxiLoc.elements[0].distance.value) {
							min = taxiLoc.elements[0].distance.value;
							taxiNum = index;
						}
					});
					// console.log("taxi num ", taxiNum); //for getting closest taxi
					const result = [taxis.result[taxiNum], response.data.rows[taxiNum]];
					res.send(result);
				})
				.catch(error => console.log("error", error));
		});
	});

	router.get("/api/mobibikes/:address", (req, res) => {
		let bikeStations = {};
		let result ={};
		request(mobibikesStations, function (error, response, body) {
			// address format example: 3353%20Douglas%20Road,%20Burnaby,%20BC,%20Canada

			if (error) throw new Error(error);
			bikeStations = JSON.parse(body);
			const destinations = req.params.address;
			let origins = "";
			
			if (bikeStations.result.length >= 99) {
				console.log("over 99 bikeStations", bikeStations.result.length);
				for (let i = 0; i < 99; i++) {
					if (i === 0) {
						origins += `${bikeStations.result[i].coordinates}`;
					} else {
						origins += `|${bikeStations.result[i].coordinates}`;
					}
				}
			} else {
				console.log("less than 99 bikeStations", bikeStations.result.length);
				bikeStations.result.map((bikeStn, index) => {
					if (i === 0) {
						origins += `${bikeStations.result[i].coordinates}`;
					} else {
						origins += `|${bikeStations.result[i].coordinates}`;
					}
				});
			}

			const optionsGM = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destinations}&key=${key}`;
			axios
				.get(optionsGM)
				.then(response => {

					let erroneous = []
					let min = response.data.rows[0].elements[0].distance.value;
					let stnId = 0;
					response.data.rows.forEach((stnLoc, index) => {
						if (stnLoc.elements[0].status === "OK" && min > stnLoc.elements[0].distance.value) {
							min = stnLoc.elements[0]["distance"]["value"];
							stnId = index;
						}
						else {
							if (stnLoc.elements[0].status !== "OK") {

								const temp = {"Address": response.data.origin_addresses[index],"BikeStation": bikeStations.result[index], "DistanceMatrix": response.data.rows[index]};
								erroneous.push(temp);
							}
						}
					});

					result.BikeStation = bikeStations.result[stnId];
					result.DistanceMatrix = bikeStations.result[stnId];
					result.Errors = erroneous;

					res.send(result) ;
				})
				.catch(error => console.log("error", error));

		});
	})

	return router;
};
