var getWeather = function(latitude, longitude, callback) {
    // api key for openweather API
    var apiKey = "8f4f46158832bf4adc1d6f6abd4fbf53";
    //set defaults
    (latitude) ? latitude : 0;
    (longitude) ? longitude : 0;

    //weather code dict from https://openweathermap.org/weather-conditions



    //sample URL:
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139

    var URL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;
    //set default return val to Sun
    var returnVal;

    $.ajax({
        url: URL,
        method: "GET",
        dataType: "json"
    })
        .done(function doneFunc(data, returnVal) {
            //object looks like:
            // {"coord":{"lon":139,"lat":35},
            //  "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
            //  "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
            //  "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
            //  "wind":{"speed":7.31,"deg":187.002},
            //  "rain":{"3h":0},
            //  "clouds":{"all":92},
            //  "dt":1369824698,
            //  "id":1851632,
            //  "name":"Shuzenji",
            //  "cod":200}
            // console.log(data.weather[0].main);
            return callback(data.weather[0]);
        }); 
}

//takes the response from weather API and maps to values of
// our spotify object: sunny, cloudy, rainy, snowy
var mapWeatherCodes = function(weatherObject) {

    //use the 'id' of the object to conduct tests
    weatherId = weatherObject.id;
    //2xx is 'Thunderstorm'
    //3xx is 'Drizzle'
    //5xx is 'Rain'
    if ((weatherId >=200 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
        return "rainy";
    }

    //6xx is 'Snow'
    else if (weatherId >= 600 && weatherId < 700) {
        return "snowy";
    }

    //7xx is 'Atmosphere'
    else if (weatherId >= 700 && weatherId <800) {
        return "windy";
    }

    //800 is 'Clear'
    else if (weatherId === 800) {
        return "sunny";
    }

    //80x is 'Clouds'
    else if (weatherId > 800 && weatherId < 900) {
        return "cloudy";
    }

    //90x is 'Extreme'
    else if (weatherId >=900 && weatherId < 910) {
        return "extreme";
    }

    //9xx is 'Additional'
    else {
        return "unusual";
    }
}
//this function takes in lat and long
// and sets the spotify player in the player element
var getWeatherCategory = function(latitude, longitude) {
    return getWeather(latitude, longitude, function(data) {
        $("#player").html(spotify[mapWeatherCodes(data)]);
        $("#weather-icon").attr("src", "http://openweathermap.org/img/w/" + data.icon + ".png");
        $("#weather-desc").html(data.main);
    });
}
