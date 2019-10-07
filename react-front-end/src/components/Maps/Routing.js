import React from "react";

export default function Routing (props) {

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
  function buildRoute(origin=props.origin, destination=props.destination) {
		if (origin !== "" && destination !== "") {
			props.setRoute({
				origin,
				destination
			});
		}
	}

  return (
    <>
    <div className="d-flex flex-wrap">
      <div className="form-group custom-control custom-radio mr-4">
        <input
          id="DRIVING"
          className="custom-control-input"
          name="travelMode"
          type="radio"
          checked={props.travelMode === "DRIVING"}
          onChange={checkDriving}
        />
        <label className="custom-control-label" htmlFor="DRIVING">
          Driving
        </label>
      </div>
      <div className="form-group custom-control custom-radio mr-4">
        <input
          id="BICYCLING"
          className="custom-control-input"
          name="travelMode"
          type="radio"
          checked={props.travelMode === "BICYCLING"}
          onChange={checkBicycling}
        />
        <label className="custom-control-label" htmlFor="BICYCLING">
          Bicycling
        </label>
      </div>
      <div className="form-group custom-control custom-radio mr-4">
        <input
          id="TRANSIT"
          className="custom-control-input"
          name="travelMode"
          type="radio"
          checked={props.travelMode === "TRANSIT"}
          onChange={checkTransit}
        />
        <label className="custom-control-label" htmlFor="TRANSIT">
          Transit
        </label>
      </div>
      <div className="form-group custom-control custom-radio mr-4">
        <input
          id="WALKING"
          className="custom-control-input"
          name="travelMode"
          type="radio"
          checked={props.travelMode === "WALKING"}
          onChange={checkWalking}
        />
        <label className="custom-control-label" htmlFor="WALKING">
          Walking
        </label>
      </div>
    </div>
    <button className="btn btn-primary" type="button" onClick={buildRoute}>
      Build Route
    </button>
    </>
  )
}