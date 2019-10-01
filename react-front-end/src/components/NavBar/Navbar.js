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
				<Link to="/">
					<b>TRANSGO</b>
				</Link>
			</span>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
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
				/>
			)}
		</nav>
	);
}
