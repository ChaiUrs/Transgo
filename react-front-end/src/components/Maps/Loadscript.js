import React from "react";
import { useState, useEffect } from "react";
import {
	GoogleMap,
	LoadScript,
	DirectionsRenderer
} from "@react-google-maps/api";
import Direction from "./Direction";

function Mymap() {
	return (
		<GoogleMap
			id="circle-example"
			mapContainerStyle={{
				height: "400px",
				width: "800px"
			}}
			zoom={7}
			center={{
				lat: -3.745,
				lng: -38.523
			}}
		/>
	);
}

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
