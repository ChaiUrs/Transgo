// Imports
import React, { Component, useState } from "react";

// Import Search Bar Components
import SearchBar from "material-ui-search-bar";

//Import React Scrit Libraray to load Google object
import Script from "react-load-script";
const [address, setAddress] = useState("");
const [query, setQuery] = useState("");

export default function Search() {
	// // Define Constructor
	// constructor(props) {
	//   super(props);

	//   // Declare State
	//   this.state = {
	//     city: '',
	//     query: ''
	//   };

	// }

	function handleScriptLoad() {
		// Declare Options For Autocomplete
		var options = {
			types: ["(cities)"]
		}; // To disable any eslint 'google not defined' errors

		// Initialize Google Autocomplete
		/*global google*/ this.autocomplete = new google.maps.places();
		document.getElementById("autocomplete"),
			options,
			// Avoid paying for data that you don't need by restricting the set of
			// place fields that are returned to just the address components and formatted
			// address.
			this.autocomplete.setFields(["address_components", "formatted_address"]);

		// Fire Event when a suggested name is selected
		this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
	}

	function handlePlaceSelect() {
		// Extract City From Address Object
		let addressObject = this.autocomplete.getPlace();
		let address = addressObject.address_components;

		// Check if address is valid
		if (address) {
			// Set State
			this.setState({
				city: address[0].long_name,
				query: addressObject.formatted_address
			});
		}
	}

	return (
		<div>
			<SearchBar
				id="autocomplete"
				placeholder=""
				hintText="Search Address"
				value={setQuery}
				style={{
					margin: "0 auto",
					maxWidth: 800
				}}
			/>
		</div>
	);
}

// export default Search;
