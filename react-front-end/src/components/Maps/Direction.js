import AutocompleteOrigin from "./AutocompleteOrigin";
import AutocompleteDestination from "./AutocompleteDestination";

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
				<hr className="ml-auto mt-0 mb-3" />
				<div className="row">
					<div className="col-ml-3 col-md-2 col-lg-2">
						<div className="form-group">
							<label htmlFor="ORIGIN">Origin</label>
							<br />
							<AutocompleteOrigin setOrigin={setOrigin} origin={origin} />
						</div>
					</div>
					<div className="col-md-2 col-lg-2">
						<div className="form-group">
							<label htmlFor="DESTINATION">Destination</label>
							<br />
							<AutocompleteDestination
								setDestination={setDestination}
								destination={destination}
							/>
						</div>
					</div>
					<div className="col-md-2 col-lg-2">
						<div className="form-group">
							<label htmlFor="DISTANCE">Distance</label>
							<br />
							<input
								id="DISTANCE"
								className="form-control"
								type="text"
								value={distance}
								onChange={event => setDistance(event.target.value)}
							/>
						</div>
					</div>
					<div className="col-md-2 col-lg-2">
						<div className="form-group">
							<label htmlFor="DURATION">Duration</label>
							<br />
							<input
								id="DURATION"
								className="form-control"
								value={duration}
								type="text"
								onChange={event => setDuration(event.target.value)}
							/>
						</div>
					</div>
					<div className="col-md-2 col-lg-2">
						<div className="form-group">
							<label htmlFor="FOOTPRINT">Carbon Footprint</label>
							<br />
							<input
								id="FOOTPRINT"
								className="form-control"
								type="text"
								onChange={event => setCarbonfootprint(event.target.value)}
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
				<br />
				<GoogleMap
					id="direction-example"
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
			</div>
		</div>
	);
}
