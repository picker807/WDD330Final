import { getEarthquakeData, getLatLong } from "./earthquake.mjs";
import EarthquakeMap from "./EarthquakeMap.mjs";
import { saveSearchTerm, loadSearchHistory, displayError } from "./util.mjs";

loadSearchHistory();
var quakeData = [];

const mapElement = document.getElementById("mapid");
const map = new EarthquakeMap(mapElement);
map.init();

// Event Listeners
var localeButton = document.getElementById("inputLocation");
localeButton.addEventListener("click", function() {
  map.clearMap(true);
  handleLocationSearch();
});

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && event.target !== localeButton) {
    event.preventDefault();
    localeButton.click();
  }
});

map.map.on("click", async function (event) {
  const latlng = event.latlng;
  const lat = latlng.lat;
  const lng = latlng.lng;
  const locationText = document.getElementById("location");
  locationText.value = `${lat},${lng}`;
  map.clearMap(false);
  handleLocationSearch();
});

async function handleLocationSearch() {
  
  const location = saveSearchTerm();
  loadSearchHistory();
  
    let coords = await getLatLong(location);
    
      map.spanToLocation(coords.lat, coords.lng, 5, false);
      quakeData = await getEarthquakeData(coords.lat, coords.lng);
      map.populateLocations(quakeData);
}
