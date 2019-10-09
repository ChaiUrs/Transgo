export default function convSecToMin(duration) {
	if (duration <= 60) {
		return `${duration} sec`;
	}
	if (duration < 3600 && duration > 60) {
		let sec = duration % 60;
		let min = Math.floor(duration / 60);
		return `${min} min`;
	}
	if (duration >= 3600) {
		let hr = Math.floor(duration / 3600);
		let min = Math.floor((duration % 3600) / 60);
		return `${hr} hr ${min} min`;
	}
}
