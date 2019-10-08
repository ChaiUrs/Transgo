import React from "react";

export default function Directiondata(props) {
	return (
		<div className="row">
			<div className="col-ml-3 col-md-3 col-lg-3">
				<div className="form-group">
					<label htmlFor="Distance">
						<b>DISTANCE</b>
					</label>
					<br />
					<input
						id="DISTANCE"
						className="form-control"
						type="text"
						value={props.distance}
					/>
				</div>
			</div>
			<div className="col-md-3 col-lg-3">
				<div className="form-group">
					<label htmlFor="Duration">
						<b>DURATION</b>
					</label>
					<br />
					<input
						id="DURATION"
						className="form-control"
						value={props.duration}
						type="text"
					/>
				</div>
			</div>
			<div className="col-md-3 col-lg-3">
				<div className="form-group">
					<label htmlFor="Carbon Footprint">
						<b>CARBON FOOTPRINT</b>
					</label>
					<br />
					<input
						id="FOOTPRINT"
						className="form-control"
						placeholder="kg/trip"
						type="text"
						value={props.carbonfootprint}
					/>
				</div>
			</div>
		</div>
	);
}
