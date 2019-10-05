import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";

export default function Navbar(props) {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	return (
		<nav className="navbar navbar-expand-lg">
			<span className="navbar-logo">
				<img
					alt="Transgo logo"
					src="/images/transgo2.jpg"
					width="130"
					height="35"
				/>{" "}
				<b>TRANSGO</b>
			</span>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarResponsive"
				aria-controls="navbarResponsive"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbar-menu">
				<ul className="navbar-nav"></ul>
			</div>

			{props.user.name ? (
				<Logout
					user={props.user}
					setUser={props.setUser}
					setName={setName}
					setPassword={setPassword}
					setUserData={props.setUserData}
					setAlert={props.setAlert}
					setLogged={props.setLogged}
				/>
			) : (
				<Login
					name={name}
					setName={setName}
					password={password}
					setPassword={setPassword}
					setUser={props.setUser}
					setUserData={props.setUserData}
					setAlert={props.setAlert}
					setLogged={props.setLogged}
				/>
			)}
		</nav>
	);
}
