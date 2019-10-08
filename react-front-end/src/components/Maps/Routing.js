import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBusAlt,
	faCar,
	faBicycle,
	faWalking,
	faRoute
} from "@fortawesome/free-solid-svg-icons";

export default function Routing(props) {
	function checkDriving({ target: { checked } }) {
		if (checked) {
			props.setTravelMode("DRIVING");
		}
	}
	function checkBicycling({ target: { checked } }) {
		if (checked) {
			props.setTravelMode("BICYCLING");
		}
	}
	function checkTransit({ target: { checked } }) {
		if (checked) {
			props.setTravelMode("TRANSIT");
		}
	}
	function checkWalking({ target: { checked } }) {
		if (checked) {
			props.setTravelMode("WALKING");
		}
	}
	function buildRoute(origin = props.origin, destination = props.destination) {
		if (origin !== "" && destination !== "") {
			props.setRoute({
				origin,
				destination
			});
		}
	}
	console.log(props.travelMode);

	return (
		<>
			<div className="d-flex flex-wrap">
				<div className="form-group custom-control">
					<input
						id="TRANSIT"
						className="custom-control-input"
						name="travelMode"
						type="button"
						checked={props.travelMode === "TRANSIT"}
						onChange={checkTransit}
					/>
					<label className="transitcontrols">
						<FontAwesomeIcon
							className="busicon"
							icon={faBusAlt}
							size="3x"
							color="blue"
							onClick={event => props.setTravelMode("TRANSIT")}
						/>
					</label>
				</div>

				<div className="form-group custom-control">
					<input
						id="DRIVING"
						className="custom-control-input"
						name="travelMode"
						type="button"
						checked={props.travelMode === "DRIVING"}
						onChange={checkDriving}
					/>
					<label className="drivingcontrols">
						<FontAwesomeIcon
							className="caricon"
							icon={faCar}
							size="3x"
							color="red"
							onClick={event => props.setTravelMode("DRIVING")}
						/>
					</label>
				</div>

				<div className="form-group custom-control">
					<input
						id="BICYCLING"
						className="custom-control-input"
						name="travelMode"
						type="button"
						checked={props.travelMode === "BICYCLING"}
						onChange={checkBicycling}
					/>
					<label className="bikingcontrols">
						<FontAwesomeIcon
							className="bikeicon"
							icon={faBicycle}
							size="3x"
							color="darkgreen"
							onClick={event => props.setTravelMode("BICYCLING")}
						/>
					</label>
				</div>

				<div className="form-group custom-control">
					<input
						id="WALKING"
						className="custom-control-input"
						name="travelMode"
						type="button"
						checked={props.travelMode === "WALKING"}
						onChange={checkWalking}
					/>
					<label className="walkingcontrols">
						<FontAwesomeIcon
							className="walkicon"
							icon={faWalking}
							size="3x"
							onClick={event => props.setTravelMode("WALKING")}
						/>
					</label>
				</div>

				<div className="form-group custom-control">
					<label className="routingcontrols">
						<FontAwesomeIcon
							className="routeicon"
							icon={faRoute}
							size="4x"
							color="purple"
							type="button"
							onClick={buildRoute}
						/>
					</label>
				</div>
			</div>

			<br />
		</>
	);
}