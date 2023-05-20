export default class EarthquakeMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.markers = [];
  }
  init() {
    this.map = L.map(this.containerId).setView([37.8, -96], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(this.map);
  }

  populateLocations(locations) {

       /* function showPosition(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        x.innerHTML = "Latitude: " + lat + 
        "<br>Longitude: " + lng;*/
        
        //locations.push({lat, lng});
        const bounds = L.latLngBounds(locations.map((location) => [location.lat, location.lng]));
        this.map.fitBounds(bounds, {maxZoom: 8});
  
        locations.forEach((location) => {
          L.marker([location.lat, location.lng])
            .addTo(this.map)
            .bindPopup(location.popupData);
        });
  }}
















/*export class EarthquakeMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.markers = [];
  }

  init() {
    return new Promise((resolve, reject) => {
      this.map = L.map(this.containerId, {
        preferCanvas: true,
      }).setView([0, 0], 1);
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          tileSize: 512,
          zoomOffset: -1,
        }
      ).addTo(this.map);
      resolve();
    });
  }

  addMarker(lat, lng, popupText) {
    const marker = L.marker([lat, lng]).addTo(this.map).bindPopup(popupText);
    this.markers.push(marker);
  }

  fitMapBounds() {
    const group = new L.featureGroup(this.markers);
    this.map.fitBounds(group.getBounds());
  }
}*/

