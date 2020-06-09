const axios = require("axios");

let result=[];
export default function gcDistanceMatrix (origins, destinations, key, taxis) {

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