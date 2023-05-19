export async function getLatLong(location) {
	//put API keys in environment files
	//attribution
	const key = "trNGcxROHe9nujAzrQhNqSefeeGUHxys";
	
	const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}`)
	const coordinateData = await response.json();
  
	return coordinateData.results[0].locations[0].latLng;
	//getApiData(latLng.lat, latLng.lng);
  }
  
export async function getEarthquakeData(latitude, longitude){
	const url = `https://everyearthquake.p.rapidapi.com/earthquakes?start=1&count=100&type=earthquake&latitude=${latitude}&longitude=${longitude}&radius=100&units=miles&magnitude=3&intensity=1`;
	const options = {
	  method: 'GET',
	  headers: {
		'X-RapidAPI-Key': '20cc1488bbmsha50fc892c0c915bp1e101cjsn47c37b113105',
		'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
	  }
	};
  
	const response = await fetch(url, options);
	const result = await response.json();
	return result.data;
	}
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
  });
