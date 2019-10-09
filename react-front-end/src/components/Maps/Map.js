import React from "react";
import {
	GoogleMap,
	Marker,
	Circle,
	DirectionsRenderer,
	DirectionsService
} from "@react-google-maps/api";
import calculateCarbonFootprint from "../../helpers/calculateCarbonFootprint";
import concSecToMin from "../../helpers/convSecToMin";
import convSecToMin from "../../helpers/convSecToMin";

export default function Map(props) {
	// console.log(props.origin, props.waypoints, props.destination);
	function onMapClick(...args) {
		console.log("onClick args: ", args);
	}

	function directionsCallback(response) {
		// console.log(response);
		if (response !== null) {
			if (response.status === "OK") {
				props.setResponse(response);
				// console.log("response Data: ", response);

				if (response.routes[0].legs.length > 1) {
					let dist = 0;
					let dur = 0;
					response.routes[0].legs.map(x => {
						dist += x.distance.value;
						dur += x.duration.value;
					});
					props.setDistance((dist * 0.001).toString() + " km");
					props.setDuration(convSecToMin(dur));
					props.setCarbonfootprint(
						calculateCarbonFootprint(props.travelMode, dist)
					);
					console.log(dist);
				} else {
					props.setDistance(response.routes[0].legs[0].distance.text);
					props.setDuration(response.routes[0].legs[0].duration.text);
					props.setCarbonfootprint(
						calculateCarbonFootprint(
							props.travelMode,
							response.routes[0].legs[0].distance.value
						)
					);
				}
			} else {
				console.log("response: ", response);
			}
		}
	}

	return (
		<GoogleMap
			id="direction-example"
			mapContainerStyle={{
				height: "500px",
				width: "100%"
			}}
			zoom={15}
			center={props.centerLocation}
			onClick={onMapClick}
			onLoad={map => {
				console.log("DirectionsRenderer onLoad map: ", map);
			}}
			onUnmount={map => {
				console.log("DirectionsRenderer onUnmount map: ", map);
			}}
		>
			<Marker
				onLoad={marker => {
					console.log("marker: ", marker);
				}}
				position={props.centerLocation}
			/>
			{props.closestTaxi ? (
				<Marker
					position={props.closestTaxi}
					icon="https://img.icons8.com/color/48/000000/taxi.png"
				/>
			) : (
				<></>
			)}

			<Circle
				onLoad={circle => {
					console.log("Circle onLoad circle: ", circle);
				}}
				onUnmount={circle => {
					console.log("Circle onUnmount circle: ", circle);
				}}
				center={props.centerLocation}
				options={{
					strokeColor: "#FF0000",
					strokeOpacity: 0.5,
					strokeWeight: 2,
					fillColor: "#FF0000",
					fillOpacity: 0.35,
					clickable: false,
					draggable: false,
					editable: false,
					visible: true,
					radius: 150,
					zIndex: 1
				}}
			/>

			{props.route.origin !== "" && props.route.destination !== "" && (
				<>
					<DirectionsService
						options={{
							destination: props.destination,
							origin: props.origin,
							waypoints: props.waypoints,
							travelMode: props.travelMode
						}}
						callback={directionsCallback}
						onLoad={directionsService => {
							console.log(
								"DirectionsService onLoad directionsService: ",
								directionsService
							);
						}}
						onUnmount={directionsService => {
							console.log(
								"DirectionsService onUnmount directionsService: ",
								directionsService
							);
						}}
					/>
					{}
				</>
			)}
			{props.response !== null && props.defaultMode === false && (
				<>
					<DirectionsRenderer
						options={{
							directions: props.response,
							polylineOptions: { strokeColor: "#999900" },
							suppressMarkers: true
						}}
						onLoad={directionsRenderer => {
							console.log(
								"DirectionsRenderer onLoad directionsRenderer: ",
								directionsRenderer
							);
						}}
						onUnmount={directionsRenderer => {
							console.log(
								"DirectionsRenderer onUnmount directionsRenderer: ",
								directionsRenderer
							);
						}}
					/>
					<Marker position={props.geoOrigin} label={"A"} />
					<Marker position={props.geoDestination} label={"B"} />
				</>
			)}
			{props.response !== null && props.defaultMode && (
				<>
					<DirectionsRenderer
						options={{
							directions: props.response,
							polylineOptions: { strokeColor: "red" }
						}}
						onLoad={directionsRenderer => {
							console.log(
								"DirectionsRenderer onLoad directionsRenderer: ",
								directionsRenderer
							);
						}}
						onUnmount={directionsRenderer => {
							console.log(
								"DirectionsRenderer onUnmount directionsRenderer: ",
								directionsRenderer
							);
						}}
					/>
				</>
			)}
		</GoogleMap>
	);
}
