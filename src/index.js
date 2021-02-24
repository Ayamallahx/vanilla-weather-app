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

    let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    return `${day}, ${hours}:${minutes}`;
}


function displayWeather(response) {

    let temperature = document.querySelector("#celcius-temp");
    temperature.innerHTML = Math.round(response.data.main.temp);

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
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);
}
let city = "london"
let apiKey = "4c4b730fc952d2218d8c25bb1938764c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(displayWeather);