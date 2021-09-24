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

document.querySelector("#day2").textContent = moment()
  .add(1, "day")
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
  //   var fivedayforecast = await fetch(
  //     `https://api.openweathermap.org/data/2.5/forecast?q=${userInput.value}&appid=${apiKey}&units=metric`
  //   ).then((response) => response.json());
  //   console.log(fivedayforecast);

  var oneCall = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${fivedayforecast.city.coord.lat}&lon=${fivedayforecast.city.coord.lon}&appid=${apiKey}&units=metric`
  ).then((response) => response.json());
  console.log(oneCall);
  var displayCity = userInput.value.toUpperCase();
  currentCity.textContent = displayCity;
  tempVal.textContent = oneCall.current.temp;
  windVal.textContent = oneCall.current.wind_speed;
  humidVal.textContent = oneCall.current.humidity;
  uviVal.textContent = oneCall.current.uvi;
}
