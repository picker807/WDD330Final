import { getEarthquakeData } from "./earthquake.mjs";
import EarthquakeMap from "./EarthquakeMap.mjs";

var quakeData = [];
const mapElement = document.getElementById("mapid");
const map = new EarthquakeMap(mapElement);
map.init();


//const x = document.getElementById("demo");
var localeButton = document.getElementById("inputLocation")
localeButton.addEventListener("click", async function(){
  quakeData = await getEarthquakeData();
  map.populateLocations(quakeData);
  console.log(quakeData);
});
localeButton.addEventListener("keypress", function(event){
  if (event.key === "Enter") {
    console.log("Enter pressed");
    localeButton.click();
  }
});





























// import EarthquakeMap from "./EarthquakeMap.mjs";
// import {getLatLong, getEarthquakeData} from "./earthquake.mjs";

// const mapElement = document.querySelector("#map");
// const mapBackground = new EarthquakeMap(mapElement);
// mapBackground.maybeInit();

// var locations = ["New York, NY"];

// Promise.all(
//     locations.map(async (location) => {
//       const { lat, lng } = await getLatLong(location);
//       const quakeData = await getEarthquakeData(lat, lng);
//       console.log(quakeData);
//       mapBackground.addMarker(lat, lng, quakeData);
//     })
//   ).then(() => {
//     mapBackground.fitMapBounds();
//   });

/*   import { EarthquakeMap } from "./EarthquakeMap.mjs";

const map = new EarthquakeMap("map");

async function fetchEarthquakeData() {
  const response = await fetch(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  );
  const data = await response.json();
  console.log(data);
  return data;
}

async function init() {
  const data = await fetchEarthquakeData();
  data.features.forEach((feature) => {
    const { lng, lat, alt } = feature.geometry.coordinates;
    const magnitude = feature.properties.mag;
    const title = feature.properties.title;
    map.addMarker(lat, lng, `${title} (magnitude ${magnitude})`);
  });
  map.fitMapBounds();
}

map.init().then(() => {
  init();
}); */

// Get earthquake locations
//const earthquakeLocations = await getEarthquakeLocations();

// Loop through locations and render markers on map
//earthquakeLocations.forEach(async location => {
//  const latLng = await getLatLong(location);
 // const quakeData = await getEarthquakeData(latLng.lat, latLng.lng);
 // mapBackground.addMarker(latLng.lat, latLng.lng, quakeData);
//});

// Fit map bounds to markers
//mapBackground.fitMapBounds();