function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function displayWeather(response) {
  celciusTemp = response.data.main.temp;

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celciusTemp);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "4c4b730fc952d2218d8c25bb1938764c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  console.log(cityInput.value);
  search(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

function showPosition(position) {
  let apiKey = "4c4b730fc952d2218d8c25bb1938764c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

function showF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let farenheitTemp = Math.round((celciusTemp * 9/5) + 32);
  currentTemp.innerHTML = farenheitTemp;
  celciusChange.classList.remove("active");
  farenheitChange.classList.add("active");
}

function showC(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round(celciusTemp);
    celciusChange.classList.add("active");
    farenheitChange.classList.remove("active");
    console.log(celciusTemp)
}
let celciusTemp = null;

let farenheitChange = document.querySelector("#farenheit-change");
farenheitChange.addEventListener("click", showF);

let celciusChange = document.querySelector("#celcius-change");
celciusChange.addEventListener("click", showC);

