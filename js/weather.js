var key = "ccf31ad40fb6d05a1f40b2802a01eada";
var cityName = document.getElementById("cityName");
var description = document.getElementById("description");
var temperature = document.getElementById("temperature");
var icon = document.getElementById("weatherIcon");

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
  }
}

getLocation();

async function getWeather(userLat, userLong) {
  var myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&APPID=${key}&units=metric`;
  let raw = await fetch(myURL);
  let data = await raw.json();
  let iconScr =
    "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  // cityName.innerHTML = data.name;
  description.innerHTML = data.weather[0].description;
  temperature.innerHTML = data.main.temp + "° c";
  icon.setAttribute("src", iconScr);
}

//  api.openweathermap.org/data/2.5/weather?q={city name}&APPID={APIKEY}

/* base: "stations"
clouds: {all: 0}
cod: 200
coord: {lon: 13.39, lat: 52.52}
dt: 1543501200
id: 2950159
main: {temp: 3, pressure: 1020, humidity: 44, temp_min: 3, temp_max: 3}
name: "Berlin"
sys: {type: 1, id: 1275, message: 0.002, country: "DE", sunrise: 1543474334, …}
visibility: 10000
weather: Array(1)
0: {id: 800, main: "Clear", description: "clear sky", icon: "01d"}
length: 1*/
