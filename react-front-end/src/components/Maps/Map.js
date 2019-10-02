import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component, useState, useEffect } from "react";
import getTaxiLocations from "../../helpers/getTaxiLocations";

export function MapContainer(props) {
	function onMarkerClick(marker) {
		console.log(marker);
	}

	console.log(props);
	function onInfoWindowClose() {}

	const [markers, setMarkers] = useState([]);

	// useEffect(() => {
	// 	getTaxiLocations().then(response => {
	// 		// console.log("gtl = ", response); // this worked
	// 		const newMarkers = [];
	// 		response.map(mark => {
	// 			newMarkers.push({
	// 				title: `${mark.driverId}`,
	// 				name: mark.driverId,
	// 				position: { lat: mark.lat, lng: mark.lng }
	// 			});
	// 		});
	// 		setMarkers(newMarkers);
	// 		// console.log("test", gTL);
	// 	});
	// }, []);

	return (
		<Map
			google={props.google}
			zoom={props.zoom}
			initialCenter={props.initialCenter}
		>
			<Marker />
			{/* {markers.map(x => (
				<Marker title={x.title} name={x.name} position={x.position} />
			))} */}
			<InfoWindow onClose={onInfoWindowClose}>
				<div>
					<h1></h1>
				</div>
			</InfoWindow>
		</Map>
	);
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_APIKEY
})(MapContainer);
