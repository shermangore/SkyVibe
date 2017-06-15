function check() {
    if ($("#weather-desc").val() == "rainy") {
        $('body').css('background-image', "url(https://s3-us-west-1.amazonaws.com/skyvibes-images/Rainy.gif)");
    } else if ($("#weather-desc").val() == "snowy") {
        $('body').css('background-image', "url(https://s3-us-west-1.amazonaws.com/skyvibes-images/Snowy.gif)");
    } else if ($("#weather-desc").val() == "windy") {
        $('body').css('background-image', "url(https://s3-us-west-1.amazonaws.com/skyvibes-images/Windy.gif)");
    } else if ($("#weather-desc").val() == "sunny") {
        $('body').css('background-image', "url(https://s3-us-west-1.amazonaws.com/skyvibes-images/Sunny.gif)");
    } else if ($("#weather-desc").val() == "cloudy") {
        $('body').css('background-image', "url(https://s3-us-west-1.amazonaws.com/skyvibes-images/Cloudy.gif)");
    } else if ($("#weather-desc").val() == "extreme") {
        $('body').css('background-image', "url(https://s3-us-west-1.amazonaws.com/skyvibes-images/Extreme.gif)");
    }
}