// Assuming you have a Leaflet map initialized
var map = L.map('map').setView([17.3981383, 78.4890028], 5);

// Create a custom icon
var customIcon = L.icon({
  iconUrl: 'path/to/custom/icon.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// Initialize the Leaflet Draw control
var drawControl = new L.Control.Draw({
  draw: {
    marker: {
      icon: customIcon  // Set the default icon for markers
    }
    // Add other draw options as needed
  },
  edit: {
    featureGroup: drawnItems
  }
});

// Add the draw control to the map
map.addControl(drawControl);

// Create a feature group to store drawn items
var drawnItems = new L.FeatureGroup().addTo(map);

// Listen for the draw:created event
map.on('draw:created', function (event) {
  var layer = event.layer;

  // Check the type of the drawn item
  if (layer instanceof L.Marker) {
    // Customize the marker icon for the drawn marker
    layer.setIcon(customIcon);
  }

  // Add the drawn item to the feature group
  drawnItems.addLayer(layer);
});

