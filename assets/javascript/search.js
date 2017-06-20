// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
/**
 * Data object to be written to Firebase.
 */
var weatherData = {
  sender: null,
  timestamp: null,
  lat: null,
  lng: null
};

// Get a reference to the database service
let database = firebase.database();

// Initialization of the Google Map
function initMap(myCenter) {
    // Initial settings of map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myCenter,
        zoom: 13
    });

    // Create a variable for the location textbox
    var input = document.getElementById('pac-input');
    // Create a variable and initialize the autocomplete functionality
    var autocomplete = new google.maps.places.Autocomplete(input);

    // Append the location textbox onto the map
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');

    infowindow.setContent(infowindowContent);

    // Creates a listener for the click event of the map in case the user wants to click on a location instead of typing a search
    map.addListener("click", function(e) {
        // Set the values of the weatherData object to push to the database
        weatherData.sender = firebase.database().ref().push().key; // Create a unique ID in firebase for the current user
        weatherData.timestamp = new Date();
        weatherData.lat = e.latLng.lat();
        weatherData.lng = e.latLng.lng();

        // Calls the getWeatherCategory function to get the weather code and set everything up
        getWeatherCategory(e.latLng.lat(), e.latLng.lng());

        // Add the current search (lat/long/user/timestamp) to the database for later analysis, etc.
        addWeatherToFirebase(weatherData);

        // Hide the map and show the weather icon div
        $("#map").hide();
        $("#weather-icon").css("opacity", 1);
    });

    // Creates a listener on the autocomplete object that works with the location text box so when the location
    //  is changed, it runs the following functionality
    autocomplete.addListener('place_changed', function () {
        // Close the info window
        infowindow.close();

        // Get the place found by the autocomplete object
        var place = autocomplete.getPlace();

        // If no place was found, then alert the user
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");

            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }

        // Set the values of the weatherData object to push to the database
        weatherData.sender = firebase.database().ref().push().key;
        weatherData.timestamp = new Date();
        weatherData.lat = place.geometry.location.lat();
        weatherData.lng = place.geometry.location.lng();

        // Calls the getWeatherCategory function to get the weather code and set everything up
        getWeatherCategory(place.geometry.location.lat(), place.geometry.location.lng());

        // Add the current search (lat/long/user/timestamp) to the database for later analysis, etc.
        addWeatherToFirebase(weatherData);

        // Hide the map and show the weather icon div
        $("#map").hide();
        $("#weather-icon").css("opacity", 1);
    });

    // Clear the autocomplete object
    autocomplete.setTypes([]);
}

function addWeatherToFirebase(data) {
    // Push the search data to the database
    database.ref("/searches").push(data);
}

$(document).ready(function () {
    // Create on-click event handler for the settings gear
    $(".fa-gear").on("click", function (event) {
        // Make sure the page doesn't submit
        event.preventDefault();

        // Create a jQuery variable of the map div
        let $mapDiv = $("#map");
        
        // If the map is showing, then hide it, otherwise show it
        if ($mapDiv.css("display") === "none") {
            // Create a new search textbox
            var pInput = '<input id="pac-input" type="text" placeholder="Enter a location">';
            
            // Append the search textbox into the container
            $("#pac-container").append(pInput);

            // Set the display value of the map to "block" (make it visible)
            $mapDiv.css("display", "block");

            // Set the display value of the search textbox to "block" (make it visible)
            $("#pac-input").css("display", "block");

            // If there is a location, then move the map to that location, otherwise center it on our classroom
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    initMap(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                });
            } else {
                initMap(new google.maps.LatLng(34.0593615, -118.4460819));
            }
        } else {
            $mapDiv.css("display", "none");
            $("#pac-input").css("display", "none");
        }
    });
});