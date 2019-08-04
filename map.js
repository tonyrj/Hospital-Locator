$( document ).ready(function() {
// lan and long
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} else {
    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    localStorage.setItem("lat",lat);
    localStorage.setItem("long",long);
    console.log('Your latitude is :'+lat+' and longitude is '+long);
    return lat;
}
function errorFunction(position){
    window.stop() 
}});

            // var sydney = new google.maps.LatLng(12.850412, 80.2241513);
var map;
var service;
var infowindow;

function initialize() {
  var location = new google.maps.LatLng(localStorage.getItem("lat"),localStorage.getItem("long"));

  map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 25
    });

  var request = {
    location: location,
    radius: '3000',
    type: ['hospital']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}
function createMarker(place) {

new google.maps.Marker({
    position: place.geometry.location,
    map: map,
    // icon: place.icon,
    animation:google.maps.Animation.Drop
});
}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
    //   console.log(place);
      createMarker(results[i]);
    }
  }
}
