export default function calculateCarbonFootprint(travelMode, distance) {
	console.log(travelMode, distance);
	switch (travelMode) {
		case "DRIVING":
			return (
				Number.parseFloat(distance * 0.20381 * 0.001)
					.toFixed(3)
					.toString() + " kg/trip"
			);
			break;
		case "WALKING":
			return (
				Number.parseFloat(distance * 0.095277 * 0.001)
					.toFixed(3)
					.toString() + " kg/trip"
			);
			break;
		case "BICYCLING":
			return (
				Number.parseFloat(distance * 0.054 * 0.001)
					.toFixed(3)
					.toString() + " kg/trip"
			);
			break;
		case "TRANSIT":
			return (
				Number.parseFloat(distance * 0.06 * 0.001)
					.toFixed(3)
					.toString() + " kg/trip"
			);
			break;
		default:
			return 0;
	}
}
