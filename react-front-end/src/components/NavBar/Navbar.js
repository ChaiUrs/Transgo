import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";

export default function Navbar(props) {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	return (
		<nav className="navbar navbar-expand-xl navbar-fixed-top">
			<span className="navbar-logo">
				<img
					alt="Transgo logo"
					src="/images/transgoicon.jpg"
					width="60"
					height="60"
				/>{" "}
				<b
					style={{
						fontSize: 60,
						color: "rgb(3, 96, 75)",
						fontFamily: "Acme",
						padding: "10px"
					}}
				>
					TRANSGO
				</b>
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
