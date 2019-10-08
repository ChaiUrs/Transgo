import React from "react";
import AutocompleteDestination from "./AutocompleteDestination";
import AutocompleteOrigin from "./AutocompleteOrigin";

export default function Sidebar(props) {
	return (
		<div className="row">
			<div className="col-md-5 col-lg-5">
				<div className="form-group">
					<label htmlFor="Origin">
						<b>ORIGIN</b>
					</label>
					<br />
					<AutocompleteOrigin
						setOrigin={props.setOrigin}
						origin={props.origin}
					/>
				</div>
			</div>
			<br />
			<div className="col-md-5 col-lg-5">
				<div className="form-group">
					<label htmlFor="Destination">
						<b>DESTINATION</b>
					</label>
					<br />
					<AutocompleteDestination
						setDestination={props.setDestination}
						destination={props.destination}
					/>
				</div>
			</div>
		</div>
	);
}
