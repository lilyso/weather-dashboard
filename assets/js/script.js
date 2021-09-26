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
//Five day forcast dates
document.querySelector("#day2").textContent = moment()
  .add(1, "day")
  .format("DD/MM/YYYY");
document.querySelector("#day3").textContent = moment()
  .add(2, "day")
  .format("DD/MM/YYYY");
document.querySelector("#day4").textContent = moment()
  .add(3, "day")
  .format("DD/MM/YYYY");
document.querySelector("#day5").textContent = moment()
  .add(4, "day")
  .format("DD/MM/YYYY");
document.querySelector("#day6").textContent = moment()
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

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (userInput.value) {
    getWeather();
  }
});

async function getWeather() {
  var fivedayForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${userInput.value}&appid=${apiKey}&units=metric`
  ).then((response) => response.json());
  console.log(fivedayForecast);

  var oneCall = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${fivedayForecast.city.coord.lat}&lon=${fivedayForecast.city.coord.lon}&appid=${apiKey}&units=metric`
  ).then((response) => response.json());
  console.log(oneCall);

  var displayCity = userInput.value.toUpperCase();
  currentCity.textContent = displayCity;
  tempVal.textContent = oneCall.current.temp;
  windVal.textContent = oneCall.current.wind_speed;
  humidVal.textContent = oneCall.current.humidity;
  uviVal.textContent = oneCall.current.uvi;
  uvIndexLevel();
  //   displayForecast();
}

// function displayForecast() {
//   var foreCards = [];
// }

function uvIndexLevel() {
  var colorIndex = parseInt(uviVal.textContent);
  console.log(colorIndex);
  if (colorIndex <= 2) {
    uviVal.classList.add("bg-green-300");
  } else if (colorIndex >= 3 && colorIndex <= 5) {
    uviVal.classList.add("bg-yellow-300");
  } else if (colorIndex >= 6 && colorIndex <= 7) {
    uviVal.classList.add("bg-yellow-600");
  } else if (colorIndex >= 8 && colorIndex <= 10) {
    uviVal.classList.add("bg-red-500");
  } else if (colorIndex >= 11) {
    uviVal.classList.add("bg-red-700");
  }
}
