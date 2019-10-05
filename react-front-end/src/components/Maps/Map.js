const React = require("react");
const { useState, useEffect } = require("react");
const {
	GoogleMap,
	DirectionsService,
	DirectionsRenderer,
	Marker,
	Circle
} = require("@react-google-maps/api");

export default function Direction(props) {
	const [response, setResponse] = useState(null);
	const [disResponse, setdisResponse] = useState(null);
	const [travelMode, setTravelMode] = useState(null);
	const [origin, setOrigin] = useState("");
	const [destination, setDestination] = useState("");
	const [route, setRoute] = useState({
		origin,
		destination
	});
	const [distance, setDistance] = useState("");
	const [duration, setDuration] = useState("");
	const [carbonfootprint, setCarbonfootprint] = useState("");
	const [autocomplete, setAutocomplete] = useState("");

	function directionsCallback(response) {
		console.log(response);
		if (response !== null) {
			if (response.status === "OK") {
				setResponse(response);
				console.log("response Data: ", response);
				setDistance(response.routes[0].legs[0].distance.text);
				setDuration(response.routes[0].legs[0].duration.text);
			} else {
				console.log("response: ", response);
			}
		}
	}

	function distanceCallback(disResponse) {
		if (disResponse !== null) {
			if (disResponse.status === "OK") {
				setdisResponse(disResponse);
				console.log("Distance response Data: ", disResponse);
			} else {
				console.log("response: ", disResponse);
			}
		}
	}

	function onMapClick(...args) {
		console.log("onClick args: ", args);
	}

	return (
		<GoogleMap
			id="map"
			mapContainerStyle={{
				paddingTop: "10px",
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

			{route.origin !== "" && route.destination !== "" && (
				<>
					<DirectionsService
						options={{
							destination: destination,
							origin: origin,
							travelMode: travelMode
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

			{response !== null && (
				<DirectionsRenderer
					options={{
						directions: response
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
	);
}
