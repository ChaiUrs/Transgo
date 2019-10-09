import React from "react";

export default function Directiondata(props) {
	return (
		<div className="container">
			<div className="col-md-3 col-lg-3">
				<div className="form-group">
					<label htmlFor="Distance">
						<b
							style={{
								fontSize: 30,
								color: "Black",
								fontFamily: "Monospace",
								padding: "30px"
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
								padding: "30px"
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
						value={`${props.duration}`}
					/>
				</div>
			</div>

			<div className="col-md-3 col-lg-3">
				<div className="form-group">
					<label htmlFor="Carbon Footprint">
						<b
							style={{
								fontSize: 30,
								color: "Purple",
								fontFamily: "Monospace",
								padding: "45px"
							}}
						>
							CARBON
						</b>
					</label>
					<br />
					<input
						id="FOOTPRINT"
						className="form-control"
						type="text"
						value={`${props.carbonfootprint}`}
					/>
				</div>
			</div>
		</div>
	);
}
