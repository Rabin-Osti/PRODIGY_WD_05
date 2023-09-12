const weatherCondition = document.querySelector(".weather-condition");
const degree = document.querySelector(".degree");
const cityName = document.querySelector(".cityName");
const pressure = document.querySelector(".pressure");
const wind = document.querySelector(".wind");
const visibility = document.querySelector(".visibility");
const humidity = document.querySelector(".humidity");
const cityInput = document.getElementById("cityInput");
const searchIcon = document.getElementById("searchIcon");
const weatherImage = document.querySelector(".weatherImage");

let path = "/images/weather";

async function fetchCity() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      // throw new Error("Network response was not OK");
      renderData("Kolkata");
      return;
    }
    const data = await response.json();
    renderData(data.city);
  } catch (error) {
    console.error("Error fetching user's location:", error);
    renderData("Kolkata");
  }
}

async function renderData(city) {
  try {
    const response = await fetch("YOUR_API_KEY");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    if (data.weather[0].id > 700 && data.weather[0].id < 800) {
      weatherImage.src = `${path}/haze.png`;
    } else {
      let main = data.weather[0].main.toLowerCase();
      weatherImage.src = `${path}/${main}.png`;
    }

    weatherCondition.textContent = `${data.weather[0].description.toUpperCase()}`;
    degree.innerHTML = `${(data.main.temp - 273.15).toFixed(2)} &deg;C`;
    cityName.textContent = data.name;
    pressure.textContent = `${data.main.pressure} hPa`;
    wind.textContent = `${data.wind.speed} m/s`;
    visibility.textContent = `${data.visibility} m`;
    humidity.textContent = `${data.main.humidity} %`;
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
}

function validateCity(cityValue) {
  if (cityValue.trim() !== "") {
    renderData(cityValue);
  } else {
    alert("Please enter a valid city name.");
  }
}
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    validateCity(cityInput.value);
  }
});

searchIcon.addEventListener("click", function () {
  validateCity(cityInput.value);
});
fetchCity();
