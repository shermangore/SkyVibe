//function to return the appropriate iframe player for the input weather
var spotify = function() {
    return {
        //returns sunny playlist: spotify:user:spotify:playlist:37i9dQZF1DWVlm7xgnWdvJ
        sunny: '<iframe src="https://open.spotify.com/embed?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DWVlm7xgnWdvJ&theme=white" width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>',
        //returns for a cloudy day playlist: spotify:user:1225385727:playlist:2zpkYAHiRzC6Rkmem5LCSh
        cloudy: '<iframe src="https://open.spotify.com/embed?uri=spotify%3Auser%3A1225385727%3Aplaylist%3A2zpkYAHiRzC6Rkmem5LCSh&theme=dark" width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>',
        //returns rainy day playlist: spotify:user:spotify:playlist:37i9dQZF1DXbvABJXBIyiY
        rainy: '<iframe src="https://open.spotify.com/embed?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DXbvABJXBIyiY&theme=dark" width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>',
        //returns snowy day playlist: spotify:user:11135485325:playlist:1UOKjxsR4Kcauv8oUYtNzO
        snowy: '<iframe src="https://open.spotify.com/embed?uri=spotify%3Auser%3A11135485325%3Aplaylist%3A1UOKjxsR4Kcauv8oUYtNzO&theme=white" width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>'
    }
}();

