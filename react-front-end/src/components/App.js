import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import axios from "axios";
import "../styles/App.css";
import Navbar from "./NavBar/Navbar.js";

export default function App() {
	const [user, setUser] = useState({ id: "", name: "", password: "" });
	const [userdata, setUserData] = useState([]);
	const [alert, setAlert] = useState("");

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
				<></>
			)}
		</Router>
	);
}
