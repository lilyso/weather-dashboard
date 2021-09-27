//  API link + API key
//  Time and date displayed
//     - moment()
//  Local weather
//     - temp, wind, humidity, uv index with colour rating
//  5 day forecast cards
//     - temp - *c
//     - wind speed - kms/hr
//     - humidity - %
//     - UV index & colour rating
//     - icon
//  Form loads with past history
//     - button elements
//     - local weather
//     - local storage
//  API
//     api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335    &units=metric
//  Icons
//     - sunshine
//     - sun/cloud
//     - cloud
//     - rain
//     - storm
//     - storm/lightning
//     - windy

// Current date
document.querySelector("#current-date").textContent =
  moment().format("DD/MM/YYYY");
// Five day forcast dates
document.querySelector("#date1").textContent = moment()
  .add(1, "day")
  .format("DD/MM/YYYY");
document.querySelector("#date2").textContent = moment()
  .add(2, "day")
  .format("DD/MM/YYYY");
document.querySelector("#date3").textContent = moment()
  .add(3, "day")
  .format("DD/MM/YYYY");
document.querySelector("#date4").textContent = moment()
  .add(4, "day")
  .format("DD/MM/YYYY");
document.querySelector("#date5").textContent = moment()
  .add(5, "day")
  .format("DD/MM/YYYY");

var apiKey = "65f855456871827b60b4fe75048ff499";
var userInput = document.querySelector("#user-input");
var formEl = document.querySelector("#search-form");
var currentCity = document.querySelector("#current-city");
var tempVal = document.querySelector("#temp");
var windVal = document.querySelector("#wind");
var humidVal = document.querySelector("#humid");
var uviVal = document.querySelector("#uvi");
var currentIcon = document.querySelector("#current-icon");
var oneCall;

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  if (userInput.value) {
    getWeather();
  }
});

// API Request
async function getWeather() {
  var errorMessage = document.querySelector("#error-message");
  errorMessage.textContent = "";
  var fivedayForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${userInput.value}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      errorMessage.textContent = "*City Not Found";
    });
  var oneCall = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${fivedayForecast.city.coord.lat}&lon=${fivedayForecast.city.coord.lon}&appid=${apiKey}&units=metric`
  ).then((response) => response.json());
  console.log(oneCall);

  //Current city conditions
  var displayCity = userInput.value.toUpperCase();
  currentCity.textContent = displayCity;
  tempVal.textContent = oneCall.current.temp;
  windVal.textContent = oneCall.current.wind_speed;
  humidVal.textContent = oneCall.current.humidity;
  uviVal.textContent = oneCall.current.uvi;
  uvIndexLevel(parseInt(oneCall.current.uvi));

  currentWeatherIcon = oneCall.current.weather[0].main;
  if (currentWeatherIcon === "Clear") {
    currentIcon.src = "assets/images/icons8-sun-50.png";
  } else if (currentWeatherIcon === "Clouds") {
    currentIcon.src = "assets/images/icons8-partly-cloudy-day-50.png";
  } else if (currentWeatherIcon.main === "Drizzle") {
    currentIcon.src = "assets/images/icons8-drizzle-50-2.png";
  } else if (currentWeatherIcon === "Rain") {
    currentIcon.src = "assets/images/icons8-rain-50.png";
  } else if (currentWeatherIcon === "Thunderstorm") {
    currentIcon.src = "assets/images/icons8-storm-50.png";
  } else if (currentWeatherIcon === "Snow") {
    currentIcon.src = "assets/images/icons8-snow-50.png";
  } else {
    console.log(currentWeatherIcon);
  }

  // 5 Day Forcast conditions
  var tempCard = document.querySelectorAll(".temp");
  var windCard = document.querySelectorAll(".wind");
  var humidCard = document.querySelectorAll(".humid");
  var weatherEl = document.querySelectorAll(".weather-icon");

  for (let i = 0; i < 5; i++) {
    var forcastData = oneCall.daily[i];
    tempCard[i].textContent = forcastData.temp.max;
    windCard[i].textContent = forcastData.wind_speed;
    humidCard[i].textContent = forcastData.humidity;

    var forecastIcon = forcastData.weather[0].main;
    if (forecastIcon === "Clear") {
      weatherEl[i].src = "assets/images/icons8-sun-50.png";
    } else if (forecastIcon === "Clouds") {
      weatherEl[i].src = "assets/images/icons8-partly-cloudy-day-50.png";
    } else if (forecastIcon === "Drizzle") {
      weatherEl[i].src = "assets/images/icons8-drizzle-50-2.png";
    } else if (forecastIcon === "Rain") {
      weatherEl[i].src = "assets/images/icons8-rain-50.png";
    } else if (forecastIcon === "Thunderstorm") {
      weatherEl[i].src = "assets/images/icons8-storm-50.png";
    } else if (forecastIcon === "Snow") {
      weatherEl[i].src = "assets/images/icons8-snow-50.png";
    } else {
      console.log(forecastIcon);
    }
  }
  //   }
  //   for (let i = 0; i < 5; i++) {
  //     var forecastIcon = oneCall.weather[i];
  //     weatherEl[i].classList.add()
  //     function weatherIcon() {
  //         if (forecastIcon.main = "Clouds") {

  //         }
  //       }
}
// UV Index Rating
var currentClass;
function uvIndexLevel(uvi) {
  if (currentClass) uviVal.classList.remove(currentClass);
  if (uvi <= 2) {
    uviVal.classList.add("bg-green-300");
    currentClass = "bg-green-300";
  } else if (uvi <= 5) {
    uviVal.classList.add("bg-yellow-300");
    currentClass = "bg-yellow-300";
  } else if (uvi <= 7) {
    uviVal.classList.add("bg-yellow-600");
    currentClass = "bg-yellow-600";
  } else if (uvi <= 10) {
    uviVal.classList.add("bg-red-500");
    currentClass = "bg-red-500";
  } else {
    uviVal.classList.add("bg-red-700");
    currentClass = "bg-red-700";
  }
}
