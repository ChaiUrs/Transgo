import { func } from "prop-types";
import MyMapWithAutocomplete from "./MyMapWithAutocomplete";

const React = require("react");
const { useState, useEffect } = require("react");
const {
	GoogleMap,
	DirectionsService,
	DirectionsRenderer,
	Marker,
	Autocomplete,
	StandaloneSearchBox,
	DistanceMatrixService,
	Circle
} = require("@react-google-maps/api");
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;

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
	const [autocomplete, setAutocomplete] = useState("");

	function directionsCallback(response) {
		console.log(response);
		if (response !== null) {
			if (response.status === "OK") {
				setResponse(response);
				console.log("response Data: ", response);
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

	// const autocompleteRef = useRef(null);

	// function onLoad(autocomplete) {
	// 	console.log("autocomplete: ", autocomplete);

	// 	autocompleteRef.current = autocomplete;
	// }

	// function onPlaceChanged() {
	// 	if (autocompleteRef.current !== null) {
	// 		console.log(autocompleteRef.current.getPlace());
	// 	} else {
	// 		console.log("Autocomplete is not loaded yet!");
	// 	}
	// }

	function checkDriving({ target: { checked } }) {
		if (checked) {
			setTravelMode("DRIVING");
		}
	}
	function checkBicycling({ target: { checked } }) {
		if (checked) {
			setTravelMode("BICYCLING");
		}
	}
	function checkTransit({ target: { checked } }) {
		if (checked) {
			setTravelMode("TRANSIT");
		}
	}
	function checkWalking({ target: { checked } }) {
		if (checked) {
			setTravelMode("WALKING");
		}
	}
	function buildRoute() {
		if (origin !== "" && destination !== "") {
			setRoute({
				origin,
				destination
			});
		}
	}
	function onMapClick(...args) {
		console.log("onClick args: ", args);
	}

	function onLoad(autocomplete) {
		console.log("autocomplete: ", autocomplete);

		setAutocomplete(autocomplete);
	}

	function onPlaceChanged() {
		if (autocomplete !== null) {
		} else {
			console.log("Autocomplete is not loaded yet!");
		}
	}

	return (
		<div className="map">
			<div className="map-settings">
				<hr className="mt-0 mb-3" />
				<div className="row">
					<div className="col-md-6 col-lg-4">
						<div className="form-group">
							<label htmlFor="ORIGIN">Origin</label>
							<br />
							{/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
							<input
								id="ORIGIN"
								className="form-control"
								type="text"
								onChange={event => setOrigin(event.target.value)}
							/>
							{/* </Autocomplete> */}
						</div>
					</div>
					<div className="col-md-6 col-lg-4">
						<div className="form-group">
							<label htmlFor="DESTINATION">Destination</label>
							<br />
							<input
								id="DESTINATION"
								className="form-control"
								type="text"
								onChange={event => setDestination(event.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="d-flex flex-wrap">
					<div className="form-group custom-control custom-radio mr-4">
						<input
							id="DRIVING"
							className="custom-control-input"
							name="travelMode"
							type="radio"
							checked={travelMode === "DRIVING"}
							onChange={checkDriving}
						/>
						<label className="custom-control-label" htmlFor="DRIVING">
							Driving
						</label>
					</div>
					<div className="form-group custom-control custom-radio mr-4">
						<input
							id="BICYCLING"
							className="custom-control-input"
							name="travelMode"
							type="radio"
							checked={travelMode === "BICYCLING"}
							onChange={checkBicycling}
						/>
						<label className="custom-control-label" htmlFor="BICYCLING">
							Bicycling
						</label>
					</div>
					<div className="form-group custom-control custom-radio mr-4">
						<input
							id="TRANSIT"
							className="custom-control-input"
							name="travelMode"
							type="radio"
							checked={travelMode === "TRANSIT"}
							onChange={checkTransit}
						/>
						<label className="custom-control-label" htmlFor="TRANSIT">
							Transit
						</label>
					</div>
					<div className="form-group custom-control custom-radio mr-4">
						<input
							id="WALKING"
							className="custom-control-input"
							name="travelMode"
							type="radio"
							checked={travelMode === "WALKING"}
							onChange={checkWalking}
						/>
						<label className="custom-control-label" htmlFor="WALKING">
							Walking
						</label>
					</div>
				</div>
				<button className="btn btn-primary" type="button" onClick={buildRoute}>
					Build Route
				</button>
			</div>
			<div className="map-container">
				<GoogleMap
					// required
					id="direction-example"
					// required
					mapContainerStyle={{
						height: "600px",
						width: "100%"
					}}
					// required
					zoom={15}
					// required
					center={props.centerLocation}
					// optional
					onClick={onMapClick}
					// optional
					onLoad={map => {
						console.log("DirectionsRenderer onLoad map: ", map);
					}}
					// optional
					onUnmount={map => {
						console.log("DirectionsRenderer onUnmount map: ", map);
					}}
				>
					{/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
						<input
							id="ORIGIN"
							className="form-control"
							type="text"
							onChange={event => setOrigin(event.target.value)}
						/>
          </Autocomplete> */}

					{/* <MyMapWithAutocomplete /> */}

					<Marker
						onLoad={marker => {
							console.log("marker: ", marker);
						}}
						position={props.centerLocation}
					/>
					<Circle
						// optional
						onLoad={circle => {
							console.log("Circle onLoad circle: ", circle);
						}}
						// optional
						onUnmount={circle => {
							console.log("Circle onUnmount circle: ", circle);
						}}
						// required
						center={props.centerLocation}
						// required
						options={{
							strokeColor: "#FF0000",
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: "#FF0000",
							fillOpacity: 0.35,
							clickable: false,
							draggable: false,
							editable: false,
							visible: true,
							radius: 1000,
							zIndex: 1
						}}
					/>

					{route.origin !== "" && route.destination !== "" && (
						<>
							<DirectionsService
								// required
								options={{
									destination: destination,
									origin: origin,
									travelMode: travelMode
								}}
								// required
								callback={directionsCallback}
								// optional
								onLoad={directionsService => {
									console.log(
										"DirectionsService onLoad directionsService: ",
										directionsService
									);
								}}
								// optional
								onUnmount={directionsService => {
									console.log(
										"DirectionsService onUnmount directionsService: ",
										directionsService
									);
								}}
							/>
							{/* <DistanceMatrixService
								options={{
									destination: destination,
									origin: origin,
									travelMode: travelMode,
									unitSystem: window.google.maps.UnitSystem.METRIC
								}}
								callback={distanceCallback}
							/> */}
						</>
					)}
					{response !== null && (
						<DirectionsRenderer
							// required
							options={{
								directions: response
							}}
							// optional
							onLoad={directionsRenderer => {
								console.log(
									"DirectionsRenderer onLoad directionsRenderer: ",
									directionsRenderer
								);
							}}
							// optional
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
		</div>
	);
}
