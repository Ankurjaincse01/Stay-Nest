// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        // Form is valid, allow submission
        form.classList.add('was-validated')
        return true;
      }

      form.classList.add('was-validated')
      event.preventDefault()
    }, false)
  })
})()

// Initialize Leaflet Map
if (document.getElementById('map') && typeof listing !== 'undefined') {
  // Get coordinates from listing or use default
  let coordinates = [51.505, -0.09]; // Default coordinates (London)
  
  if (listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2) {
    // GeoJSON format is [longitude, latitude], Leaflet uses [latitude, longitude]
    coordinates = [listing.geometry.coordinates[1], listing.geometry.coordinates[0]];
  }
  
  var map = L.map('map').setView(coordinates, 13);
  
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  // Create custom popup
  var popupContent = `
    <div style="text-align: center;">
      <h5 style="margin: 0 0 10px 0; color: #e74c3c;">${listing.title || 'Listing'}</h5>
      <p style="margin: 5px 0;"><strong>📍 ${listing.location || 'Location'}</strong></p>
      <p style="margin: 5px 0; font-size: 0.9em; color: #666;">Exact location provided after booking</p>
    </div>
  `;
  
  // Create red marker with popup
  var marker = L.marker(coordinates, {
    icon: L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })
  })
  .addTo(map)
  .bindPopup(popupContent, {
    maxWidth: 300,
    className: 'custom-popup'
  });
}