// Selector variables
var inputval = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');

// OpenWeatherMap API key (get your own at https://www.openweathermap.org/appid)
var apiKey = "3045dd712ffe6e702e3245525ac7fa38";

// Function to convert Kelvin to Celsius
function convertKelvinToCelsius(val) {
    return (val - 273.15).toFixed(2);
}

// Event listener for button click
btn.addEventListener('click', function() {
    var cityInput = inputval.value.trim(); // Trim whitespace from input

    if (cityInput) {
        // Fetch weather data from OpenWeatherMap API
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=' + apiKey)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(function(data) {
            var cityName = data.name;
            var weatherDescription = data.weather[0].description;
            var temperature = data.main.temp;
            var windSpeed = data.wind.speed;

            // Update HTML elements with weather data
            city.innerHTML = 'City: ' + cityName;
            description.innerHTML = 'Conditions: ' + weatherDescription;
            temp.innerHTML = 'Temperature: ' + convertKelvinToCelsius(temperature) + ' °C';
            wind.innerHTML = 'Wind Speed: ' + windSpeed + ' km/h';

        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
            alert('City not found. Please enter a valid city name.');
        });
    } else {
        alert('Please enter a city name.');
    }
});
    
