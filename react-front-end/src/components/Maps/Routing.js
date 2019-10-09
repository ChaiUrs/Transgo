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
							paddingTop="2"
							size="3x"
							color="blue"
							onClick={event => props.setTravelMode("TRANSIT")}
						/>
					</label>
					<br />
					<b
						style={{
							fontSize: 20,
							color: "DarkRed",
							fontFamily: "Acme",
							paddingRight: "30px"
						}}
					>
						TRANSIT
					</b>
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
							color="Red"
							onClick={event => props.setTravelMode("DRIVING")}
						/>
					</label>
					<br />
					<b
						style={{
							fontSize: 20,
							color: "Indigo",
							fontFamily: "Acme",
							paddingRight: "30px"
						}}
					>
						DRIVING
					</b>
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
					<br />
					<b
						style={{
							fontSize: 20,
							color: "Khaki",
							fontFamily: "Acme",
							paddingRight: "30px"
						}}
					>
						BIKING
					</b>
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
					<br />
					<b
						style={{
							fontSize: 20,
							color: "Blue",
							fontFamily: "Acme",
							paddingRight: "200px"
						}}
					>
						WALKING
					</b>
				</div>
				<div className="form-group custom-control">
					<label className="routingcontrols">
						<FontAwesomeIcon
							className="routeicon"
							icon={faRoute}
							size="3x"
							color="purple"
							onClick={buildRoute}
						/>
					</label>
					<br />
					<b
						style={{
							fontSize: 20,
							color: "MidnightBlue",
							fontFamily: "Acme"
						}}
					>
						BUILD ROUTE
					</b>
				</div>
			</div>
			<br />
		</>
	);
}
