import React from "react";
import "../../styles/App.css";

export default function Logout(props) {
	return (
		<>
			<span className="welcome white-text">
				<b>Welcome, {props.user.name}</b>
			</span>
			<button
				type="submit"
				className="btn btn-danger"
				onClick={() => {
					props.setUser({ name: "", password: "" });
					props.setName("");
					props.setPassword("");
					props.setAlert("");
				}}
			>
				LOGOUT
			</button>
		</>
	);
}
