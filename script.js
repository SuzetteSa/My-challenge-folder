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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${input.value}`;
  console.log(input.value);
  let apiKey = "6f65a5e46f3b9a6f53fba583f75e2f9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function displayWeather(response) {
  console.log(response.data.daily);
  let currentTemp = document.querySelector("#main-temperature");
  let currentDescription = document.querySelector("#tempDescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#todayDayTime");
  let iconElement = document.querySelector("#icon");

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  currentDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

navigator.geolocation.getCurrentPosition(handlePosition);

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "63cc1d1431a87304a93a810d47128eef";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlLocation).then(getCurrentPosition);
}

function getCurrentPosition(response) {
  console.log(response.data.main.temp);
  let temperatureAlert = Math.round(response.data.main.temp);
  console.log(temperatureAlert);
  alert(`It is ${temperatureAlert}°C at your current location.`);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function displayfahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheiTemperature = (14 * 9) / 5 + 32;

  let temperatureElement = document.querySelector("#main-temperature");
  (temperatureElement.innerHTML = Math), round(fahrenheiTemperature);
}

let nowlocation = document.querySelector(".button");
nowlocation.addEventListener("click", getLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);
