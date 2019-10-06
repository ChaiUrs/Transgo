import React from "react";
import AutocompleteDestination from "./AutocompleteDestination";
import AutocompleteOrigin from "./AutocompleteOrigin"; 

export default function Sidebar (props) {

  return(
  <div className="row">
					<div className="col-ml-3 col-md-2 col-lg-2">
						<div className="form-group">
							<label htmlFor="ORIGIN">Origin</label>
							<br />
							<AutocompleteOrigin setOrigin={props.setOrigin} origin={props.origin} />
						</div>
					</div>
					<div className="col-md-2 col-lg-2">
						<div className="form-group">
							<label htmlFor="DESTINATION">Destination</label>
							<br />
							<AutocompleteDestination
								setDestination={props.setDestination}
								destination={props.destination}
							/>
						</div>
					</div>
					<div className="col-md-2 col-lg-2">
						<div className="form-group">
							<label htmlFor="DISTANCE">Distance</label>
							<br />
							<input
								id="DISTANCE"
								className="form-control"
								type="text"
								value={props.distance}
								// onChange={event => props.setDistance(event.target.value)}
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
								value={props.duration}
								type="text"
								// onChange={event => setDuration(event.target.value)}
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
								value={`${props.carbonfootprint} kg/km`}
								// onChange={event => setCarbonfootprint(event.target.value)}
							/>
						</div>
					</div>
				</div>
  )
}