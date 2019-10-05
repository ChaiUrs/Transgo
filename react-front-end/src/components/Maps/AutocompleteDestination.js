import React from "react";
import { useRef, useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

export default function AutocompleteDestination(props) {
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
				id="DESTINATION"
				className="form-control"
				type="text"
				onChange={event => {
					props.setDestination(event.target.value);
				}}
				onSelect={event => {
					props.setDestination(event.target.value);
				}}
			/>
		</Autocomplete>
	);
}
