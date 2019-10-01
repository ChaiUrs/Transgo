const express = require("express");
const router = express.Router();
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

	return router;
};
