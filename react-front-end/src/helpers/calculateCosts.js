export default function calculateCost(travelMode, defaultMode, distance) {

  if (defaultMode) {
    
    switch (travelMode) {
      case "DRIVING":
        return (`$ ${Number.parseFloat(distance * 0.77 * 0.001)
          .toFixed(2)
          .toString()}`
        );
        break;
      case "WALKING":
        return `---`;
        break;
      case "BICYCLING":
        return `---`;
        break;
      case "TRANSIT":
        return `$3 - $5.75`;
        break;
      default:
        return 0;
    }
  } else {
    return (`$ ${Number.parseFloat((distance * 1.88 * 0.001) + 3.25)
    .toFixed(2)
    .toString()}`
    );
  }
}