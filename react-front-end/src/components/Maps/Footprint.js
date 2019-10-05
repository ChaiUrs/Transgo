import React from "react";

export default function Footprint(props) {
	return (
		<div className="col-md-2 col-lg-2">
			<div>
				<div className="form-group">
					<label htmlFor="DISTANCE">Distance</label>
					<br />
					<input
						id="DISTANCE"
						className="form-control"
						type="text"
						value={props.distance}
						onChange={event => props.setDistance(event.target.value)}
					/>
				</div>
			</div>
			<div className="col-md-2 col-lg-2">
				<div className="form-group">
					<label htmlFor="DURATION">Duration</label>
					<br />
					<input
						id="DURATION"
						className="form-control"
						type="text"
						value={props.duration}
						onChange={event => props.setDuration(event.target.value)}
					/>
				</div>
			</div>
			<div className="col-md-2 col-lg-2">
				<div className="form-group">
					<label htmlFor="FOOTPRINT">Carbon Footprint</label>
					<br />
					<input
						id="FOOTPRINT"
						className="form-control"
						type="text"
						value={props.carbonfootprint}
						onChange={event => props.setCarbonfootprint(event.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}
