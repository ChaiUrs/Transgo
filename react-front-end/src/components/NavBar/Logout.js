import React from "react";
import "../../styles/App.css";
import userAuthentication from "../../helpers/userAuthentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Logout(props) {
	return (
		<>
			<span className="welcome">
				<b>Welcome, {props.user.name}</b>
			</span>
			<button
				type="submit"
				className="btn btn-danger btn-md"
				onClick={() => {
					props.setUser({ name: "", password: "" });
					props.setName("");
					props.setPassword("");
					props.setAlert("");
					props.setLogged(false);
				}}
			>
				<FontAwesomeIcon icon={faSignOutAlt} />
			</button>
		</>
	);
}
