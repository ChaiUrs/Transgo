import { Autocomplete } from "@react-google-maps/api";
const { Component, useRef } = require("react");
const React = require("react");
// const { GoogleMap, LoadScript } = require("../../");
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;

export default function MyMapWithAutocomplete(props) {
	const autocompleteRef = useRef(null);

	function onLoad(autocomplete) {
		console.log("autocomplete: ", autocomplete);

		autocompleteRef.current = autocomplete;
	}

	function onPlaceChanged() {
		if (autocompleteRef.current !== null) {
			console.log(autocompleteRef.current.getPlace());
		} else {
			console.log("Autocomplete is not loaded yet!");
		}
	}
	return (
		<Autocomplete onLoad={onLoad} onPlacesChanged={onPlaceChanged}>
			<input
				type="text"
				placeholder="Customized your placeholder"
				style={{
					boxSizing: `border-box`,
					border: `1px solid transparent`,
					width: `240px`,
					height: `32px`,
					padding: `0 12px`,
					borderRadius: `3px`,
					boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
					fontSize: `14px`,
					outline: `none`,
					textOverflow: `ellipses`,
					position: "absolute",
					left: "50%",
					marginLeft: "-120px"
				}}
			/>
		</Autocomplete>
	);
}
