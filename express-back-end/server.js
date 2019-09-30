// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const App = express();
const morgan = require("morgan");
const cors = require("cors");

//middleware config
App.use(cors());
App.use(morgan("dev"));
App.set("view engine", "ejs");
App.use(bodyParser.urlencoded({ extended: true }));
App.use(express.json());
App.use(express.static("public"));

// Separated Routes for each Resource
const datbaseRoutes = require("./routes/database.js");

// Mount all resource routes
App.use(datbaseRoutes());

App.listen(PORT, () => {
	console.log(
		`Express Server is listening on port ${PORT} so that's pretty good 👍`
	);
});
