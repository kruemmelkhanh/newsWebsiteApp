var key = "ccf31ad40fb6d05a1f40b2802a01eada";
var cityName = document.getElementById("cityName");
var description = document.getElementById("description");
var temperature = document.getElementById("temperature");
var icon = document.getElementById("weatherIcon");
var todayMax = document.getElementById("todayMax");
var todayMin = document.getElementById("todayMin");
var forecast1 = document.getElementById("forecast1");
var forecast2 = document.getElementById("forecast2");
var forecast3 = document.getElementById("forecast3");
var forecast4 = document.getElementById("forecast4");
var forecast5 = document.getElementById("forecast5");

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

async function getWeather(userLat, userLong) {
  var myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&APPID=${key}&units=metric`;
  let raw = await fetch(myURL);
  let data = await raw.json();
  let iconScr =
    "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  cityName.innerHTML = data.name;
  description.innerHTML = "<p>" + data.weather[0].description + "</p>";
  temperature.innerHTML = data.main.temp.toFixed(1) + "° c";
  icon.setAttribute("src", iconScr);
}

async function getForecast(userLat, userLong) {
  var myURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${userLat}&lon=${userLong}&cnt=6&APPID=${key}&units=metric`;
  let raw = await fetch(myURL);
  let data = await raw.json();
  let today = new Date();
  let day = today.getDay();
  const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  todayMax.innerHTML = "↑ " + data.list[0].temp.max.toFixed(1) + "°";
  todayMin.innerHTML = "↓ " + data.list[0].temp.min.toFixed(1) + "°";
  let forecastBox = document.getElementById("forecastBox");
  // console.log(data);
  for (let i = 1; i < 6; i++) {
    let div = document.createElement("div");
    div.classList.add("dailyForecast");
    let dayIcon = document.createElement("img");
    let dayName = document.createElement("p");
    let dayMax = document.createElement("p");
    let dayMin = document.createElement("p");
    let iconScr =
      "https://openweathermap.org/img/w/" +
      data.list[i].weather[0].icon +
      ".png";
    dayIcon.setAttribute("src", iconScr);
    dayName.innerHTML = dayOfTheWeek[(day + i) % 7];
    dayMax.innerHTML = data.list[i].temp.max.toFixed(1) + "°";
    dayMin.innerHTML = data.list[i].temp.min.toFixed(1) + "°";
    // console.log(dayName, dayMax, dayMin);
    div.appendChild(dayIcon);
    div.appendChild(dayName);
    div.appendChild(dayMax);
    div.appendChild(dayMin);
    forecastBox.appendChild(div);
  }
}
