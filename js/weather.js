var donut = "ccf31ad40fb6d05a1f40b2802a01eada";
var cityName = document.getElementById("cityName");
var description = document.getElementById("description");
var temperature = document.getElementById("temperature");
var icon = document.getElementById("weatherIcon");
var todayMax = document.getElementById("todayMax");
var todayMin = document.getElementById("todayMin");

/* custom png sets for openweathermap icons */

const IconFinder = {
  "01d": "./img/weatherIcons/clear_day.png",
  "01n": "./img/weatherIcons/clear_night.png",
  "02d": "./img/weatherIcons/cloudy_day.png",
  "02n": "./img/weatherIcons/cloudy_night.png",
  "03d": "./img/weatherIcons/cloudy.png",
  "03n": "./img/weatherIcons/cloudy.png",
  "04d": "./img/weatherIcons/cloudy.png",
  "04n": "./img/weatherIcons/cloudy.png",
  "09d": "./img/weatherIcons/rain_shower.png",
  "09n": "./img/weatherIcons/rain_shower.png",
  "10d": "./img/weatherIcons/rain_normal.png",
  "10n": "./img/weatherIcons/rain_normal.png",
  "11d": "./img/weatherIcons/thunderstorm.png",
  "11n": "./img/weatherIcons/thunderstorm.png",
  "13d": "./img/weatherIcons/snow.png",
  "13n": "./img/weatherIcons/snow.png",
  "50d": "./img/weatherIcons/mist.png",
  "50n": "./img/weatherIcons/mist.png"
};

/* getting location */

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(gotPosition);
  } else {
    alert("Something is terribly wrong.");
  }

  function gotPosition(position) {
    let userLat = position.coords.latitude;
    let userLong = position.coords.longitude;
    getWeather(userLat, userLong);
    getForecast(userLat, userLong);
  }
}

getLocation();

/* getting current weather */

async function getWeather(userLat, userLong) {
  var myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&APPID=${donut}&units=metric`;
  let raw = await fetch(myURL);
  let data = await raw.json();
  let iconRaw = data.weather[0].icon;
  let iconScr = IconFinder[iconRaw];
  let cityNameData = data.name.split(" ");
  if (cityNameData.length > 1) {
    cityName.innerHTML = cityNameData[0];
  } else {
    cityName.innerHTML = data.name;
  }
  let weatherRaw = data.weather[0].description.split(" ");
  let weatherDone = [];
  for (let word of weatherRaw) {
    word = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    weatherDone.push(word);
  }
  weatherDone = weatherDone.join(" ");
  description.innerHTML = "<p>" + weatherDone + "</p>";
  temperature.innerHTML = data.main.temp.toFixed(1) + " °C";
  icon.setAttribute("src", iconScr);
}

/* getting the forecast */

async function getForecast(userLat, userLong) {
  var myURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${userLat}&lon=${userLong}&cnt=6&APPID=${donut}&units=metric`;
  let raw = await fetch(myURL);
  let data = await raw.json();
  let today = new Date();
  let day = today.getDay();
  const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  todayMax.innerHTML = "↑ " + data.list[0].temp.max.toFixed(1) + "°";
  todayMin.innerHTML = "↓ " + data.list[0].temp.min.toFixed(1) + "°";
  let forecastBox = document.getElementById("forecastBox");
  for (let i = 1; i < 6; i++) {
    let div = document.createElement("div");
    div.classList.add("dailyForecast");
    let dayIcon = document.createElement("img");
    let dayName = document.createElement("p");
    dayName.classList.add("dayName");
    let dayMax = document.createElement("p");
    dayMax.classList.add("dayMax");
    let dayMin = document.createElement("p");
    dayMin.classList.add("dayMin");
    let iconRaw = data.list[i].weather[0].icon;
    let iconScr = IconFinder[iconRaw];
    iconScr =
      iconScr.slice(0, 19) +
      "forecastIcons/" +
      iconScr.slice(19, iconScr.length);
    dayIcon.setAttribute("src", iconScr);
    dayName.innerHTML = dayOfTheWeek[(day + i) % 7];
    dayMax.innerHTML = " " + data.list[i].temp.max.toFixed() + "°";
    dayMin.innerHTML = data.list[i].temp.min.toFixed() + "°";
    div.appendChild(dayName);
    div.appendChild(dayIcon);
    div.appendChild(dayMax);
    div.appendChild(dayMin);
    forecastBox.appendChild(div);
  }
}
