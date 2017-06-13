var autocomplete = new google.maps.places.Autocomplete(input);

autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    
    var place = autocomplete.getPlace();
    
    if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }
});
