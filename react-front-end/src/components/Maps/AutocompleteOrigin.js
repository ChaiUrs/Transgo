import React from "react";
import { useRef, useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

export default function AutocompleteOrigin(props) {
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
				id="ORIGIN"
				className="form-control"
				type="text"
				style={{
					color: "black",
					fontSize: 20
				}}
				onChange={event => {
					props.setOrigin(event.target.value);
				}}
				onSelect={event => {
					props.setOrigin(event.target.value);
				}}
			/>
		</Autocomplete>
	);
}
