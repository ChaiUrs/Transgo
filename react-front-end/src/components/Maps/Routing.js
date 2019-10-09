import React from "react";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBusAlt,
	faCar,
	faBicycle,
	faWalking,
	faRoute
} from "@fortawesome/free-solid-svg-icons";
import closestTaxi from "../../helpers/closestTaxi";

export default function Routing(props) {
	let cTaxi = {};

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
	async function buildRoute(e) {
		e.preventDefault();
		// origin = Object.assign(
		// 	Object.create(Object.getPrototypeOf(origin)),
		// 	origin
		// );

		if (props.defaultMode === false) {
			console.log(props.origin);
			await closestTaxi(props.origin).then(result => {
				console.log(result);
				props.setOrigin(`${result[0].lat},${result[0].long}`);
				props.setClosestTaxi({ lat: result[0].lat, lng: result[0].long });
				// const wpt = [];
				// const wptObj = {};
				// wptObj.location = origin;
				// wptObj.stopover = true;
				// wpt.push(wptObj);
				props.setWaypoints([{ location: props.origin }]);
				// console.log("Waypoints ", props.origin, props.waypoints);
				if (props.origin !== "" && props.destination !== "") {
					// console.log(cTaxi);
					// console.log("origin", origin);
					props.setRoute({
						origin: props.origin, //: {cTaxi[0].lat, cTaxi[0].long},
						waypoints: props.waypoints,
						destination: props.destination
					});
				}
			});
			// console.log("taxi route ", props.route);
		} else {
			if (props.origin !== "" && props.destination !== "") {
				props.setRoute({
					origin: props.origin,
					waypoints: props.waypoints,
					destination: props.destination
				});
			}
		}
	}
	// console.log(props.travelMode);

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
							onClick={event => {
								props.setTravelMode("TRANSIT");
								props.setDefaultMode(true);
							}}
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
							onClick={event => {
								props.setTravelMode("DRIVING");
								props.setDefaultMode(true);
							}}
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
							onClick={event => {
								props.setTravelMode("BICYCLING");
								props.setDefaultMode(true);
							}}
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
							onClick={event => {
								props.setTravelMode("WALKING");
								props.setDefaultMode(true);
							}}
						/>
					</label>
				</div>

				<div className="form-group custom-control">
					<input
						id="TAXI"
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
							onClick={event => {
								props.setTravelMode("DRIVING");
								props.setDefaultMode(false);
							}}
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
