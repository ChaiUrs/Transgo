import AutocompleteOrigin from "./AutocompleteOrigin";
import AutocompleteDestination from "./AutocompleteDestination";
import Map from "./Map";
import Sidebar from "./Sidebar";
import Routing from "./Routing";

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
				<Sidebar
					origin={origin}
					setOrigin={setOrigin}
					destination={destination}
					setDestination={setDestination}
					distance={distance}
					duration={duration}
					carbonfootprint={carbonfootprint}
				/>
				<Routing
					travelMode={travelMode}
					setTravelMode={setTravelMode}
					route={route}
					setRoute={setRoute}
					origin={origin}
					destination={destination}
				/>
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
