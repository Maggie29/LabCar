function initMap() {
  var lima = {lat: -12.0453, lng:  -77.0311};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: lima
  });

  // UBICACIÓN
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var posicion = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var marker = new google.maps.Marker({
        position: posicion,
        map: map
      });
      map.setCenter(posicion);
      map.setZoom(18);

    }, function() {
      alert('No pudimos encontrar su ubicación');
    });
  }

  //TARIFA
  var entrada =new google.maps.places.Autocomplete(document.getElementById('partida'));
  var destino =new google.maps.places.Autocomplete(document.getElementById('destino'));

  var trazarRuta = document.getElementById('trazar-ruta');
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  trazarRuta.addEventListener('click',function (event) {
    displayRoute(entrada, destino);
    directionsDisplay.setMap(map);

  })

  function displayRoute(origin, destination) {
    service.route({
      origin: origin.value,
      destination: destination.value,
      travelMode: 'DRIVING',
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('No podemos encontrar una ruta');
      }
    });
  }

}
