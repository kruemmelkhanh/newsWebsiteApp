var bananas = "ccf31ad40fb6d05a1f40b2802a01eada";
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
  var myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&APPID=${bananas}&units=metric`;
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
  var myURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${userLat}&lon=${userLong}&cnt=6&APPID=${bananas}&units=metric`;
  let raw = await fetch(myURL);
  let data = await raw.json();
  // console.log(data);
  todayMax.innerHTML = "↑ " + data.list[0].temp.max.toFixed(1);
  todayMin.innerHTML = "↓ " + data.list[0].temp.min.toFixed(1);
  forecast1.innerHTML = data.list[1].temp.max.toFixed(1);
  forecast2.innerHTML = data.list[2].temp.max.toFixed(1);
  forecast3.innerHTML = data.list[3].temp.max.toFixed(1);
  forecast4.innerHTML = data.list[4].temp.max.toFixed(1);
  forecast5.innerHTML = data.list[5].temp.max.toFixed(1);
}
