// Variables used throughout code

var ApiKey = 'f4ec5dcff4823d5712d2cbe8b9348d8c';
var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=';
var formEL = $('#search-city');
var currentDate = moment().format('DD/M/YYYY');
var forecastEl = $('.forecast');
var historyEl = $('#history');
var cityEl = $('#city');
var fiveForecastEl = $('#five-forecast');
var weatherIcon = 'http://openweathermap.org/img/wn/';
var citySearch = [];

function fetchWeather(city) {
    var coordinates = `${openWeatherUrl}${city}&appid=${ApiKey}`
    fetch (coordinates) 
        .then (function (coordinateResult) {
            if (coordinateResult.ok) {
                coordinateResult.json().then(function (data) {
                    var lon = data.coord.lon;
                    var lat = data.coord.lat;
                    var apiFetch = forecastUrl + lat + '&lon=' + lon + '&appid=' + ApiKey + '&units=metric';

                    fetch(apiFetch)
                        .then(function (weatherResult) {
                            if (weatherResult.ok) {
                                weatherResult.json().then(function (weatherInfo) {
                                    
                                    // current day container
                                    // Jquery for this container 
                                    var weatherNow = $('<div></div>')
                                    .attr({ id: 'weather-now'})
                                    var current = weatherInfo.list[0];
                                    var icon = current.weather[0].icon;
                                    var cityIcon = weatherIcon + icon + '.png';
                                    var iconEL = $('<img>')
                                        .attr({ id: 'weather-current-icon',
                                                src: cityIcon,
                                                alt: 'Icon for weather'});

                                    var currentHeading = $('<h2></h2>')
                                        .text(city + ' (' + currentDate + ')');

                                    var weatherListCurrent = $('<ul></ul>');

                                    var weatherDetailsCurrent = ['Temp: ' + current.main.temp + ' °C', 'Wind: ' + current.wind.speed + ' MPH', 'Humidity: ' + current.main.humidity + '%']
                                    
                                    for (var i = 0; i < weatherDetailsCurrent.length; i++) {
                                        var currentWeatherItem = $('<li></li>')
                                            .text(weatherDetailsCurrent[i])
                                        weatherListCurrent.append(currentWeatherItem);    
                                    }

                                    weatherNow.append(currentHeading);
                                    currentHeading.append(iconEL);
                                    weatherNow.append(weatherListCurrent);
                                    $('#five-forecast').before(weatherNow);
