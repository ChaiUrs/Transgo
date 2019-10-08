import React from "react";
import AutocompleteDestination from "./AutocompleteDestination";
import AutocompleteOrigin from "./AutocompleteOrigin";

export default function Sidebar(props) {
	return (
		<div className="row">
			<div className="col-md-5 col-lg-5">
				<div className="form-group">
					<label htmlFor="Origin">
						<b
							style={{
								fontSize: 30,
								color: "brown",
								fontFamily: "Monospace",
								padding: "10px",
								textAlign: "center"
							}}
						>
							ORIGIN
						</b>
					</label>
					<br />
					<AutocompleteOrigin
						setOrigin={props.setOrigin}
						origin={props.origin}
					/>
				</div>
			</div>
			<br />
			<div className="col-ml-5 col-md-5 col-lg-5">
				<div className="form-group">
					<label htmlFor="Destination">
						<b
							style={{
								fontSize: 30,
								color: "green",
								fontFamily: "Monospace",
								padding: "10px",
								textAlign: "center"
							}}
						>
							DESTINATION
						</b>
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
