function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  return `${day}, ${hour}:${minute}`;
}

function formatDay(timestamp){
let date = new Date(timestamp * 1000)
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = date.getDay();

return days[day]
}

function displayForecast(response) {

 let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu","Fri","Sat","Sun","Mon","Tues","Wed"];
  
  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) { 
    if(index < 6){
  forecastHTML =
    forecastHTML +
    `
     <div class="col-2">
     <div class="weather-forecast-date"> ${formatDay(forecastDay.dt)} </div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
        width="42"
        />
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperatures-max">${Math.round(forecastDay.temp.max)}° /</span>
            <span class="weather-forecast-temperatures-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
</div>
`;
    }
  });
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3cde88569b53e442b31a872afecfd5a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let currentTemp = document.querySelector("#main-temperature");
  let cityElement = document.querySelector("#city")
  let currentDescription = document.querySelector("#tempDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#todayDayTime");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  currentDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);


getForecast(response.data.coord);

}

function search(city){
let apiKey = "3cde88569b53e442b31a872afecfd5a1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayfahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature"); 

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Paris");