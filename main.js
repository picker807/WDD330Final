import { getEarthquakeData, getLatLong } from "./earthquake.mjs";
import EarthquakeMap from "./EarthquakeMap.mjs";
import {saveSearchTerm, loadSearchHistory} from "./util.mjs";

loadSearchHistory();
var quakeData = [];

const mapElement = document.getElementById("mapid");
const map = new EarthquakeMap(mapElement);
map.init();

//Event Listeners
var localeButton = document.getElementById("inputLocation")
localeButton.addEventListener("click", async function(){
  map.clearMap();
  const location = saveSearchTerm();

  console.log(location);

  loadSearchHistory();
  let coords = await getLatLong(location);

  console.log("2 ", coords.lat, coords.lng);

  map.spanToLocation(coords.lat, coords.lng, 5, false);
  quakeData = await getEarthquakeData(coords.lat, coords.lng);
  map.populateLocations(quakeData);
});
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter" && event.target !== localeButton) {
    event.preventDefault();
    localeButton.click();
  }
});