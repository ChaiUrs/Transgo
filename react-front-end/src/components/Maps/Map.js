import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";

export function MapContainer(props) {
	function onMarkerClick(marker) {
		console.log(marker);
	}

	console.log(props);
	function onInfoWindowClose() {}

	const markers = [
		<Marker
			title={"The marker`s title will appear as a tooltip."}
			name={"SOMA"}
			position={{ lat: 37.778519, lng: -122.40564 }}
		/>,
		<Marker
			name={"Dolores park"}
			position={{ lat: 37.759703, lng: -122.428093 }}
		/>,
		<Marker />
	];
	return (
		<Map
			google={props.google}
			zoom={props.zoom}
			initialCenter={props.initialCenter}
		>
			{markers}
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
