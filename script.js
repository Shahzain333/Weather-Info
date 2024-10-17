document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDislay = document.getElementById("city-name");
  const temperatureDislay = document.getElementById("temperature");
  const descriptionDislay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "e750c0db06cd19f78c5c46ab772dfd2a"; //env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //gets tha data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {

      const response = await fetch(url);
      //console.log(typeof response);
      //console.log("Response", response);

      if (!response.ok) {
        throw new Error(`City Not Found`);
      }

      const data = await response.json();
      return data
      //console.log(data);

    } catch (error) {
      console.error(error.message);
    }

  }

  function displayWeatherData(data) {
    //display
    //console.log(data);
    const {name, main, weather} = data
    cityNameDislay.textContent = name;
    temperatureDislay.textContent = `Temperature : ${main.temp}`
    descriptionDislay.textContent = `Temperature : ${weather[0].description}`

    //unlock the display
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');

  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

});
