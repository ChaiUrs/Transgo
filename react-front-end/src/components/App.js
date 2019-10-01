import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
// import axios from "axios";
import "../styles/App.css";
import Navbar from "./NavBar/Navbar.js";
// import { Map, GoogleApiWrapper } from "google-maps-react";
import Map from "./Maps/Map.js";

const pos = {};

function showPosition(position) {
	pos.lat = position.coords.latitude;
	pos.lng = position.coords.longitude;
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log("Can't get the geolocation");
	}
}
getLocation();

export default function App() {
	const [user, setUser] = useState({ id: "", name: "", password: "" });
	const [userdata, setUserData] = useState([]);
	const [alert, setAlert] = useState("");
	const style = {
		width: "100%",
		height: "100%"
	};

	return (
		<Router className="App">
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnVisibilityChange
				draggable
				pauseOnHover
			/>
			<Navbar
				user={user}
				setUser={setUser}
				setUserData={setUserData}
				setAlert={setAlert}
			/>

			{alert.length ? (
				<div
					className="alert alert-danger"
					role="alert"
					style={{ position: "relative" }}
				>
					{alert}
					<button
						className="alert alert-danger"
						style={{
							position: "absolute",
							zIndex: "1",
							top: "-1px",
							right: "0px"
						}}
						onClick={() => {
							setAlert("");
						}}
					>
						X
					</button>
				</div>
			) : (
				<Map zoom={8} initialCenter={pos} />
			)}
		</Router>
	);
}
