export default class EarthquakeMap {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.markers = [];
    this.initialLat = 37.8;
    this.initialLong = -96;
    this.initialZoom = 3;
  }
  init() {
    this.map = L.map(this.containerId).setView([this.initialLat, this.initialLong], this.initialZoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(this.map);
  }

  populateLocations(locations) {
    const bounds = L.latLngBounds(locations.map((location) => [location.lat, location.lng]));
    this.map.fitBounds(bounds, {maxZoom: 8});
  
    locations.forEach((location) => {
      L.marker([location.lat, location.lng], {
        icon: L.divIcon({
          className: location.level,
          iconSize: [20, 20]

        })
      })
        .addTo(this.map)
        .bindPopup(location.popupData, {className: "leaflet-popup"});
    });
  }
  clearMap() {
    this.map.eachLayer(function (layer) {
      if (layer instanceof L.Marker && layer.getPopup()) {
        this.map.removeLayer(layer);
      }
    }, this);
    this.spanToLocation(null, null, null, true);
  }

  spanToLocation(lat, lng, zoom, clear) {
    if (clear){
      this.map.flyTo([this.initialLat, this.initialLong], this.initialZoom, {duration: this.duration});
    } else {
      this.map.flyTo([lat, lng], zoom, {duration: this.duration});
    }
    
  }
}


