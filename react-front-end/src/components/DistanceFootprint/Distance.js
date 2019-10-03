import React from "react";
import GoogleMap from "google-distance-matrix";

class SimpleForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			origin: "",
			destination: "",
			distanceText: "testing the distance text"
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);

		this.onChange = origin => this.setState({ origin });
		this.changeDest = destination => this.setState({ destination });
	}

	handleFormSubmit = event => {
		const component = this;
		const { origin, destination } = this.state;

		event.preventDefault();

		GoogleMap.matrix(origin, destination, function(err, distances) {
			if (err) {
				return console.log(err);
			}

			if (!distances) {
				return console.log("no distances");
			}

			if (distances.status == "OK") {
				if (distances.rows[0].elements[0]) {
					var distance = distances.rows[0].elements[0].duration["text"];

					component.setState({
						foundDistance: true,
						distanceText: distance
					});
				}
			}
		}).bind(this);
	};
}
