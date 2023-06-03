import {updateStatus, toggleStatusVisible, displayError} from "./util.mjs";

export async function getLatLong(location) {
	const key = "trNGcxROHe9nujAzrQhNqSefeeGUHxys";
	const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}`)
	const coordinateData = await response.json();
	const latitude = coordinateData.results[0].locations[0].latLng.lat;
	const longitude = coordinateData.results[0].locations[0].latLng.lng;
	
	return {"lat": latitude, "lng": longitude};
  }

export async function getEarthquakeData(latitude, longitude){
	var distance = 100;
	var result = {data: []};
	toggleStatusVisible(true);
	while (result.data.length === 0){
		
		updateStatus(distance);
		const url = `https://everyearthquake.p.rapidapi.com/earthquakes?start=1&count=100&type=earthquake&latitude=${latitude}&longitude=${longitude}&radius=${distance}&units=miles&magnitude=3&intensity=1`;
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
		try{
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`${response.status}`)
			}
			const responseData = await response.json();
		
  			result.data = responseData.data;
			distance += 100;
		} catch (e) {
  			displayError("No Earthquakes here. Try another location.");
			toggleStatusVisible(false);
			break;
		}
	}
	toggleStatusVisible(false);
	const quakeData = getQuakeInfo(result.data);
	
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
	var quakeClass = "custom-marker-med";
	const {date, time} = getModifiedDate(quake.date);
	const popupData = `
	<strong>Location:</strong> ${quake.location}<br>
	<strong>Date:</strong> ${date}<br>
	<strong>Time:</strong> ${time} UTC<br>
	<strong>Magnitude:</strong> ${quake.magnitude}<br>
	<strong>Depth:</strong> ${quake.depth} km<br>
	<a href="${quake.url}" target="_blank">More Info</a>
	`
	if (quake.magnitude > 6.0) {
		quakeClass = "custom-marker-high";
	} else if (quake.magnitude < 4.0) {
		quakeClass = "custom-marker-low";
	}

	return {
		level: quakeClass,
		lat: quake.latitude,
		lng: quake.longitude,
		popupData: popupData
	}
}  

function getModifiedDate(quakeDate) {
	const dateTime = new Date(quakeDate);
	const time = dateTime.toTimeString().split(" ")[0];
	const options = {year: "numeric", month: "long", day: "numeric"};
	const date = dateTime.toLocaleDateString(undefined, options);

	return {date, time};
}



