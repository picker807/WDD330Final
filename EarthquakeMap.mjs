


export class EarthquakeMap {
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
}

