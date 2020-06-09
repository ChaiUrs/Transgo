const axios = require("axios");

let result=[];
exports.gcDistanceMatrix = function (origins, destinations, key, taxis) {

  const optionsGM = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destinations}&key=${key}`;
			axios
				.get(optionsGM)
				.then(response => {
					// console.log(response);
					// res.send(response.data);
					// console.log("length taxis ", taxis.result.length);
					console.log("results from api ", response.data.rows.length);
					//
					// console.log(response);
					min = response.data.rows[0].elements[0].distance.value;
					taxiNum = 0;
					response.data.rows.map((taxiLoc, index) => {
						if (min > taxiLoc.elements[0].distance.value) {
							min = taxiLoc.elements[0].distance.value;
							taxiNum = index;
						}
					});
          // console.log("taxi num ", taxiNum); //for getting closest taxi
          result.push(taxis.result[taxiNum]);
          result.push(response.data.rows[taxiNum]);
				})
        .catch(error => console.log("error", error))
        .finally(()=> {
          return result;
        });
};

return result;

exports.closestMobiStn = function (origins, destinations, key, bikeStations, result) {
	const optionsGM = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destinations}&key=${key}`;
			axios
				.get(optionsGM)
				.then(response => {

					let erroneous = []
					let min = response.data.rows[0].elements[0].distance.value;
					let stnId = 0;
					response.data.rows.forEach((stnLoc, index) => {
						if (stnLoc.elements[0].status === "OK" && min > stnLoc.elements[0].distance.value) {
							min = stnLoc.elements[0]["distance"]["value"];
							stnId = index;
						}
						else {
							if (stnLoc.elements[0].status !== "OK") {

								const temp = {"Address": response.data.origin_addresses[index],"BikeStation": bikeStations.result[index], "DistanceMatrix": response.data.rows[index]};
								erroneous.push(temp);
							}
						}
					});

					result.push(bikeStations.result[stnId]);
					result.push(response.data.rows[stnId]);
					result.push(JSON.stringify(erroneous,null," "));
					console.log("Error result", JSON.stringify(erroneous,null," "));
					return result;
				})
				.catch(error => console.log("error", error));
};

