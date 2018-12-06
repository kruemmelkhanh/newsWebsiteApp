var key = "ccf31ad40fb6d05a1f40b2802a01eada";
var cityName = document.getElementById("cityName");
var description = document.getElementById("description");
var temperature = document.getElementById("temperature");
var icon = document.getElementById("weatherIcon");
var todayMax = document.getElementById("todayMax");
var todayMin = document.getElementById("todayMin");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(gotPosition);
    // console.log("ĥello");
  } else {
    alert("Something is terribly wrong.");
  }

  function gotPosition(position) {
    let userLat = position.coords.latitude;
    let userLong = position.coords.longitude;
    // console.log(userLat);
    getWeather(userLat, userLong);
    getForecast(userLat, userLong);
  }
}

getLocation();

async function getWeather(userLat, userLong) {
  var myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&APPID=${key}&units=metric`;
  let raw = await fetch(myURL);
  let data = await raw.json();
  console.log(data);
  let iconScr =
    "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  cityName.innerHTML = data.name;
  description.innerHTML = data.weather[0].description;
  temperature.innerHTML = data.main.temp.toFixed(1) + "° c";
  icon.setAttribute("src", iconScr);
}

async function getForecast(userLat, userLong) {
  var myURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${userLat}&lon=${userLong}&cnt=3&APPID=${key}&units=metric`;
  let raw = await fetch(myURL);
  let data = await raw.json();
  console.log(data);
  todayMax.innerHTML = "↑ " + data.list[0].temp.max.toFixed(1);
  todayMin.innerHTML = "↓ " + data.list[0].temp.min.toFixed(1);
}
