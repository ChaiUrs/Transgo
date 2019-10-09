import React from "react";

export default function Directiondata(props) {
	return (
		<div className="container">
			<div className="col-md-3 col-lg-3">
				<div className="form-group">
					<label htmlFor="Carbon Footprint">
						<b
							style={{
								fontSize: 30,
								color: "DarkGreen",
								fontFamily: "Monospace",
								padding: "40px"
							}}
						>
							FOOTPRINT
						</b>
					</label>
					<br />
					<input
						id="FOOTPRINT"
						className="form-control"
						type="text"
						style={{
							color: "black",
							fontSize: 25
						}}
						value={`${props.carbonfootprint}`}
					/>
				</div>
			</div>

			<div className="col-md-3 col-lg-3">
				<div className="form-group">
					<label htmlFor="Distance">
						<b
							style={{
								fontSize: 30,
								color: "MediumVioletRed",
								fontFamily: "Monospace",
								padding: "40px"
							}}
						>
							DISTANCE
						</b>
					</label>
					<br />
					<input
						id="DISTANCE"
						className="form-control"
						type="text"
						style={{
							color: "black",
							fontSize: 25
						}}
						value={`${props.distance}`}
					/>
				</div>
			</div>

			<div className="col-md-3 col-lg-3">
				<div className="form-group">
					<label htmlFor="Duration">
						<b
							style={{
								fontSize: 30,
								color: "Navy",
								fontFamily: "Monospace",
								padding: "40px"
							}}
						>
							DURATION
						</b>
					</label>
					<br />
					<input
						id="DURATION"
						className="form-control"
						type="text"
						style={{
							color: "black",
							fontSize: 25
						}}
						value={`${props.duration}`}
					/>
				</div>
			</div>

			<div className="col-md-3 col-lg-3">
				<div className="form-group">
					<label htmlFor="Cost">
						<b
							style={{
								fontSize: 30,
								color: "Black",
								fontFamily: "Monospace",
								padding: "75px"
							}}
						>
							COST
						</b>
					</label>
					<br />
					<input
						id="COST"
						className="form-control"
						type="text"
						style={{
							color: "black",
							fontSize: 25
						}}
						value={`${props.cost}`}
					/>
				</div>
			</div>
		</div>
	);
}
