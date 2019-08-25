const cityName = document.getElementById("cityName")
const description = document.getElementById("description")
const temperature = document.getElementById("temperature")
const icon = document.getElementById("weatherIcon")
const todayMax = document.getElementById("todayMax")
const todayMin = document.getElementById("todayMin")

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
}

/* getting location */

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(gotPosition)
  } else {
    alert("Something is terribly wrong.")
  }

  function gotPosition(position) {
    const userLat = position.coords.latitude
    const userLong = position.coords.longitude
    getWeather(userLat, userLong)
    getForecast(userLat, userLong)
  }
}

getLocation()

/* getting current weather */

async function getWeather(userLat, userLong) {
  const raw = await fetch(`https://newswebsiteapp.xqwtsz.now.sh/weather?userLat=${userLat}&userLong=${userLong}&type=${"daily"}`)
  const api = await raw.json()
  const { data } = api
  const iconRaw = data.weather[0].icon
  const iconScr = IconFinder[iconRaw]
  const cityNameData = data.name.split(" ")
  if (cityNameData.length > 1) {
    cityName.innerHTML = cityNameData[0]
  } else {
    cityName.innerHTML = data.name
  }
  const weatherRaw = data.weather[0].description.split(" ")
  const weatherDone = []
  for (let word of weatherRaw) {
    word = word.charAt(0).toUpperCase() + word.slice(1, word.length)
    weatherDone.push(word)
  }
  weatherDone = weatherDone.join(" ")
  description.innerHTML = "<p>" + weatherDone + "</p>"
  temperature.innerHTML = data.main.temp.toFixed(1) + " °C"
  icon.setAttribute("src", iconScr)
}

/* getting the forecast */

async function getForecast(userLat, userLong) {
  const raw = await fetch(`https://newswebsiteapp.xqwtsz.now.sh/weather?userLat=${userLat}&userLong=${userLong}&type=${"forecast"}`)
  const api = await raw.json()
  const { data } = api
  console.log(data)
  const today = new Date()
  const day = today.getDay()
  const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  todayMax.innerHTML = "↑ " + data.list[0].temp.max.toFixed(1) + "°"
  todayMin.innerHTML = "↓ " + data.list[0].temp.min.toFixed(1) + "°"
  const forecastBox = document.getElementById("forecastBox")
  for (let i = 1; i < 6; i++) {
    const div = document.createElement("div")
    div.classList.add("dailyForecast")
    const dayIcon = document.createElement("img")
    const dayName = document.createElement("p")
    dayName.classList.add("dayName")
    const dayMax = document.createElement("p")
    dayMax.classList.add("dayMax")
    const dayMin = document.createElement("p")
    dayMin.classList.add("dayMin")
    const iconRaw = data.list[i].weather[0].icon
    const iconScr = IconFinder[iconRaw]
    iconScr =
      iconScr.slice(0, 19) +
      "forecastIcons/" +
      iconScr.slice(19, iconScr.length)
    dayIcon.setAttribute("src", iconScr)
    dayName.innerHTML = dayOfTheWeek[(day + i) % 7]
    dayMax.innerHTML = " " + data.list[i].temp.max.toFixed() + "°"
    dayMin.innerHTML = data.list[i].temp.min.toFixed() + "°"
    div.appendChild(dayName)
    div.appendChild(dayIcon)
    div.appendChild(dayMax)
    div.appendChild(dayMin)
    forecastBox.appendChild(div)
  }
}
