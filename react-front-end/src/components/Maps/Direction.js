import AutocompleteOrigin from "./AutocompleteOrigin";
import AutocompleteDestination from "./AutocompleteDestination";
import Map from "./Map";

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
								value={`${carbonfootprint} kg/km`}
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
				<Map 
					centerLocation={props.centerLocation}
					route={route}
					setRoute={setRoute}
					destination={destination}
					origin={origin}
					setDestination={setDestination}
					setOrigin={setOrigin}
					travelMode={travelMode}
					response={response}
					setResponse={setResponse}
					distance={distance}
					setDistance={setDistance}
					duration={duration}
					setDuration={setDuration}
					carbonfootprint={carbonfootprint}
					setCarbonfootprint={setCarbonfootprint}
				/>
			</div>
		</div>
	);
}
