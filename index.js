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