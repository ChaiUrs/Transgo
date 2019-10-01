import React from "react";
import userAuthentication from "../../helpers/userAuthentication";

export default function Login(props) {
	return (
		<div className="form-inline my-2 my-lg-0 ml-auto">
			<input
				className="loginout"
				type="text"
				placeholder="Name"
				value={props.name}
				onChange={event => {
					props.setName(event.target.value);
				}}
			/>
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
				className="btn btn-primary"
				onClick={() => {
					console.log(props);
					userAuthentication({
						name: props.name,
						password: props.password
					}).then(response => {
						if (response.data.length) {
							props.setUser(response.data[0]);
							props.setAlert("");
						} else {
							props.setAlert("Invalid username or password");
						}
					});
				}}
			>
				LOGIN
			</button>
		</div>
	);
}
