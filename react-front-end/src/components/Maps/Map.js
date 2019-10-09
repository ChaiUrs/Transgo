import React from "react";
import {
	GoogleMap,
	Marker,
	Circle,
	DirectionsRenderer,
	DirectionsService
} from "@react-google-maps/api";
import calculateCarbonFootprint from "../../helpers/calculateCarbonFootprint";

export default function Map(props) {
	function onMapClick(...args) {
		console.log("onClick args: ", args);
	}

	function directionsCallback(response) {
		console.log(response);
		if (response !== null) {
			if (response.status === "OK") {
				props.setResponse(response);
				console.log("response Data: ", response);
				props.setDistance(response.routes[0].legs[0].distance.text);
				props.setDuration(response.routes[0].legs[0].duration.text);
				props.setCarbonfootprint(
					calculateCarbonFootprint(
						props.travelMode,
						response.routes[0].legs[0].distance.value
					)
				);
			} else {
				console.log("response: ", response);
			}
		}
	}

	return (
		<div id="container">
			<GoogleMap
				mapContainerStyle={{
					height: "430px",
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
				{props.response !== null && (
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
				)}
			</GoogleMap>
		</div>
	);
}
