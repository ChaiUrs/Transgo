export default function calculateCarbonFootprint(travelMode, distance) {
	switch (travelMode) {
		case "DRIVING":
			return distance * 0.20381 * 0.001;
			break;
		case "WALKING":
			return distance * 0.095277 * 0.001;
			break;
		case "BICYCLING":
			return distance * 0.054 * 0.001;
			break;
		case "TRANSIT":
			return distance * 0.06 * 0.001;
			break;
		default:
			return 0;
	}
}
