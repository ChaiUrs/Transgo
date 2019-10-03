import React, { useState } from "react";

export default function DistanceFootprint(props) {
	const [distance, setDistance] = useState(null);
	const [duration, setDuration] = useState(null);
	const [footprint, setFootprint] = useState(null);

	return (
		<div className="row">
			<div className="col-1"></div>

			<div className="form-group col-3">
				<select
					className="form-control"
					value={props.distance}
					onChange={event => {
						setDistance(event.target.value);
					}}
				>
					<option>Distance</option>
				</select>
			</div>

			<div className="form-group col-3">
				<select
					className="form-control"
					value={duration}
					onChange={event => {
						setDuration(event.target.value);
					}}
				>
					<option>Duration</option>
				</select>
			</div>

			<div className="form-group col-3">
				<select
					className="form-control"
					value={footprint}
					onChange={event => {
						setFootprint(event.target.value);
					}}
				>
					<option value={null}>Footprint</option>
				</select>
			</div>
		</div>
	);
}
