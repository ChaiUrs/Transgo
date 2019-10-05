import React from "react";
import { useRef, useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

export default function AutocompleteOrigin(props) {
	// const [result, setResult] = useState(null);
	// useEffect(() => {
	// 	function componentDidMount(origin) {
	// 		fetch(
	// 			`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${origin}&key=${process.env.REACT_APP_APIKEY}`
	// 		)
	// 			// .then(res => res.json())
	// 			.then(
	// 				result => {
	// 					setResult(result);
	// 				},
	// 				// Note: it's important to handle errors here
	// 				// instead of a catch() block so that we don't swallow
	// 				// exceptions from actual bugs in components.
	// 				error => {
	// 					setResult(error);
	// 				}
	// 			);
	// 	}
	// 	if (props.origin.length > 4) {
	// 		// console.log(props.origin);
	// 		componentDidMount(props.origin);
	// 	}
	// 	// componentDidMount();
	// }, result);

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

	// console.log("result", result);

	return (
		<Autocomplete onLoad={onLoad} onPlacesChanged={onPlaceChanged}>
			<input
				id="ORIGIN"
				className="form-control"
				type="text"
				onChange={event => {
					props.setOrigin(event.target.value);

					// event.target.value = { result };
				}}
				onSelect={event => {
					props.setOrigin(event.target.value);
				}}
			/>
		</Autocomplete>
	);
}
