import React from "react";
import "../../styles/App.css";
import userAuthentication from "../../helpers/userAuthentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default function Login(props) {
	return (
		<div className="form-inline my-2 my-lg-0 ml-auto">
			<FontAwesomeIcon icon={faUser} />
			<input
				className="loginout"
				type="text"
				placeholder="Name"
				value={props.name}
				onChange={event => {
					props.setName(event.target.value);
				}}
			/>
			<FontAwesomeIcon icon={faLock} />
			<input
				className="loginout"
				type="password"
				placeholder="Password"
				value={props.password}
				onChange={event => {
					props.setPassword(event.target.value);
				}}
			/>
			<button
				type="submit"
				className="btn btn-primary btn-md"
				onClick={() => {
					console.log(props);
					userAuthentication({
						name: props.name,
						password: props.password
					}).then(response => {
						if (response.data.length) {
							props.setUser(response.data[0]);
							props.setAlert("");
							props.setLogged(true);
						} else {
							props.setAlert("Invalid username or password");
						}
					});
				}}
			>
				<FontAwesomeIcon icon={faSignInAlt} />
			</button>
		</div>
	);
}
