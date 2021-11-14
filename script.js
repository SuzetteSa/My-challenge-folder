let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDayTime = document.querySelector("#todayDayTime");

currentDayTime.innerHTML = `${day}, ${hour}:${minute}`;

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
  console.log(response);

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#main-temperature");
  currentTemp.innerHTML = `${temperature}`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#tempDescription");
  currentDescription.innerHTML = `${description}`;
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

let nowlocation = document.querySelector(".button");
nowlocation.addEventListener("click", getLocation);
