const express = require("express");
const router = express.Router();
const request = require("request");
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

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
		request(
			options,
			function(error, response, templateVars) {
				if (error) throw new Error(error);
				// console.log(templateVars);
				res.send(templateVars);
			}
			// .then(res => {
			// 	response.send(res);
			// })
			// .catch(err => {
			// 	console.log(err);
			// })
		);
	});

	return router;
};
