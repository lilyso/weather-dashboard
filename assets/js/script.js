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
var cityArray = document.querySelector("#saved-city");

// Current date
document.querySelector("#current-date").textContent =
  moment().format("DD/MM/YYYY");
// Five day forcast dates
for (let index = 1; index < 6; index++) {
  document.querySelector("#date" + index).textContent = moment()
    .add(index, "day")
    .format("DD/MM/YYYY");
}

// Create saved city buttons
function cityButton() {
  storedCity = localStorage.getItem("city");
  if (storedCity) {
    storedCity = JSON.parse(storedCity);
    for (let index = 0; index < storedCity.length; index++) {
      console.log(storedCity[index]);
      var btn = document.createElement("button");
      btn.classList.add("cityBtn");
      btn.innerHTML = storedCity[index];
      cityArray.appendChild(btn);
    }
  }
}
cityButton();

// button = target textcontent = city

// Local storage cities
function saveCities(cityName) {
  storedCity = localStorage.getItem("city");
  if (!storedCity || storedCity === null || storedCity === "null") {
    storedCity = [];
  } else {
    storedCity = JSON.parse(storedCity);
  }
  if (storedCity.includes(cityName.toUpperCase()) === true) {
    return;
  } else {
    storedCity.push(cityName.toUpperCase());
    localStorage.setItem("city", JSON.stringify(storedCity));
  }
}

// Event listener submit city
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  if (userInput.value) {
    getWeather(userInput.value);
  }
});

// API Request
async function getWeather(city) {
  var errorMessage = document.querySelector("#error-message");
  errorMessage.textContent = "";
  var fivedayForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
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

  if (!fivedayForecast) return;

  if (fivedayForecast) saveCities(city);
  console.log(fivedayForecast);
  var oneCall = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${fivedayForecast.city.coord.lat}&lon=${fivedayForecast.city.coord.lon}&appid=${apiKey}&units=metric`
  ).then((response) => response.json());
  console.log(oneCall);

  // Populate current city conditions
  var displayCity = city.toUpperCase();
  currentCity.textContent = displayCity;
  tempVal.textContent = oneCall.current.temp;
  windVal.textContent = oneCall.current.wind_speed;
  humidVal.textContent = oneCall.current.humidity;
  uviVal.textContent = oneCall.current.uvi;
  uvIndexLevel(parseInt(oneCall.current.uvi));

  // Populate current City Weather Icon
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

  // Populate 5 Day Forcast conditions
  var tempCard = document.querySelectorAll(".temp");
  var windCard = document.querySelectorAll(".wind");
  var humidCard = document.querySelectorAll(".humid");
  var weatherEl = document.querySelectorAll(".weather-icon");

  for (let i = 0; i < 5; i++) {
    var forcastData = oneCall.daily[i];
    tempCard[i].textContent = forcastData.temp.max;
    windCard[i].textContent = forcastData.wind_speed;
    humidCard[i].textContent = forcastData.humidity;

    // Populate 5 Day Forcast weather icon
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
      console.log(forecastIcon); // catch other variations?
    }
  }
}
// Render UV Index Rating colour
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

  storedCity = localStorage.getItem("city");
  storedCity = JSON.parse(storedCity);
  console.log(storedCity);
  // if (storedCity.includes(userInput.value.toUpperCase()) === false) {
  var newCity = document.createElement("button");
  newCity.classList.add("cityBtn");
  newCity.innerHTML = userInput.value.toUpperCase();
  cityArray.appendChild(newCity);
  // }
  // return;
}
