import React from "react";
import { LoadScript } from "@react-google-maps/api";
import Direction from "./Direction";

export default function MyComponents(props) {
	return (
		<LoadScript
			id="script-loader"
			googleMapsApiKey={process.env.REACT_APP_APIKEY}
			libraries={["places"]}
		>
			<Direction centerLocation={props.centerLocation} />
		</LoadScript>
	);
}
