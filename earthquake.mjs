
export async function getLatLong() {
	//put API keys in environment files
	var location = document.getElementById("location").value;
	const key = "trNGcxROHe9nujAzrQhNqSefeeGUHxys";
	const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}`)
	const coordinateData = await response.json();
	return coordinateData;
	
  }

  //I could not get latitude and longitude to populate when returning the
  // values from getLatLong. But passing the entire JSON object and then
  // deconstructing it did work.
export async function getEarthquakeData(){
	const coordData = await getLatLong();
	const latitude = coordData.results[0].locations[0].latLng.lat;
	const longitude = coordData.results[0].locations[0].latLng.lng;
	//let {latitude, longitude} = await getLatLong();
	console.log(latitude, longitude);
	const url = `https://everyearthquake.p.rapidapi.com/earthquakes?start=1&count=100&type=earthquake&latitude=${latitude}&longitude=${longitude}&radius=100&units=miles&magnitude=3&intensity=1`;
	const options = {
	  method: 'GET',
	  headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Headers': 'Content-Type',
		'X-RapidAPI-Key': '20cc1488bbmsha50fc892c0c915bp1e101cjsn47c37b113105',
		'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
	  }
	};
	
	const response = await fetch(url, options);
	const result = await response.json();
	const quakeData = getQuakeInfo(result.data);
	console.log(result.data);
	return quakeData;
	}

function getQuakeInfo(result) {
	const quakes = [];
	result.forEach(function(quake) {
		const data = quakeTemplate(quake);
		quakes.push(data);
	});
	return quakes;
}

function quakeTemplate(quake) {
	const popupData = `<strong>Location:</strong> ${quake.location}<br>
	<strong>Date:</strong> ${quake.date}<br>
	<strong>Magnitude:</strong> ${quake.magnitude}<br>
	<strong>Depth:</strong> ${quake.depth} km<br>
	<a href="${quake.url}" target="_blank">More Info</a>`
	return {
		lat: quake.latitude,
		lng: quake.longitude,
		popupData: popupData
	}
}  


























/*
	//const data = JSON.parse(result);
  
	//const dataElement = document.getElementById('earthquake-data');

	
	// Function to render locations on the map
function renderLocations(locations) {
	locations.forEach(location => {
	  const { latitude, longitude, title, magnitude } = location;
	  map.addMarker(latitude, longitude, `Title: ${title} - Magnitude: ${magnitude}`);
	});
  }
  
  // Array of locations
  const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL'];
  
  // Loop through each location, fetch lat/lng and earthquake data, and render on the map
  locations.forEach(async location => {
	const { lat, lng } = await getLatLong(location);
	const earthquakeData = await getEarthquakeData(lat, lng);
	const locations = earthquakeData.map(earthquake => ({
	  latitude: earthquake.latitude,
	  longitude: earthquake.longitude,
	  title: earthquake.title,
	  magnitude: earthquake.magnitude
	}));
	renderLocations(locations);
  });*/
