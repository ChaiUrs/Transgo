import AutocompleteOrigin from "./AutocompleteOrigin";
import AutocompleteDestination from "./AutocompleteDestination";
import Map from "./Map";
import Sidebar from "./Sidebar";
import Routing from "./Routing";
import Directiondata from "./DirectionData";

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
	const [defaultMode, setDefaultMode] = useState(true); // to choose between taxi and default travel mode
	const [origin, setOrigin] = useState("");
	const [closestTaxi, setClosestTaxi] = useState(null);
	const [waypoints, setWaypoints] = useState(null);
	const [destination, setDestination] = useState("");
	const [route, setRoute] = useState({
		origin,
		waypoints: [],
		destination
	});
	const [distance, setDistance] = useState("");
	const [duration, setDuration] = useState("");
	const [carbonfootprint, setCarbonfootprint] = useState("");
	const [autocomplete, setAutocomplete] = useState("");
	const [geoOrigin, setGeoOrigin] = useState(null);
	const [geoDestination, setGeoDestination] = useState(null);

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
				/>
				<Routing
					travelMode={travelMode}
					setTravelMode={setTravelMode}
					defaultMode={defaultMode}
					setDefaultMode={setDefaultMode}
					route={route}
					setRoute={setRoute}
					origin={origin}
					setOrigin={setOrigin}
					waypoints={waypoints}
					setWaypoints={setWaypoints}
					destination={destination}
					closestTaxi={closestTaxi}
					setClosestTaxi={setClosestTaxi}
					geoOrigin={geoOrigin}
					setGeoOrigin={setGeoOrigin}
					geoDestination={geoDestination}
					setGeoDestination={setGeoDestination}
				/>
				<Directiondata
					distance={distance}
					duration={duration}
					carbonfootprint={carbonfootprint}
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
					waypoints={waypoints}
					setWaypoints={setWaypoints}
					travelMode={travelMode}
					response={response}
					setResponse={setResponse}
					distance={distance}
					setDistance={setDistance}
					duration={duration}
					setDuration={setDuration}
					carbonfootprint={carbonfootprint}
					setCarbonfootprint={setCarbonfootprint}
					closestTaxi={closestTaxi}
					defaultMode={defaultMode}
					geoDestination={geoDestination}
					geoOrigin={geoOrigin}
				/>
			</div>
		</div>
	);
}
