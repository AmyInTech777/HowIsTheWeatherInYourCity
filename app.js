document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "090ab9392f1o4b95tbf67d52b6723386";
    const apiUrl = "https://api.shecodes.io/weather/v1/current";
  
    function formatDate(date) {
      let minutes = date.getMinutes();
      let hours = date.getHours();
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[date.getDay()];
  
      if (minutes < 10) minutes = `0${minutes}`;
      if (hours < 10) hours = `0${hours}`;
  
      return `${day} ${hours}:${minutes}`;
    }
  
    function updateWeather(data) {
      document.querySelector("#city").innerHTML = data.city;
      document.querySelector("#temperature").innerHTML = Math.round(data.temperature.current);
      document.querySelector("#description").innerHTML = data.condition.description;
      document.querySelector("#wind-speed").innerHTML = `Wind: ${data.wind.speed} m/s`;
      document.querySelector("#humidity").innerHTML = `Humidity: ${data.temperature.humidity}%`;
      document.querySelector("#current-date").innerHTML = formatDate(new Date());
  
      const weatherIcon = document.querySelector("#weather-icon");
      const description = data.condition.description.toLowerCase();
      if (description.includes("rain")) {
        weatherIcon.innerHTML = "🌧️";
      } else if (description.includes("cloud")) {
        weatherIcon.innerHTML = "☁️";
      } else if (description.includes("clear")) {
        weatherIcon.innerHTML = "🌞";
      } else if (description.includes("snow")) {
        weatherIcon.innerHTML = "❄️";
      } else {
        weatherIcon.innerHTML = "🌈"; // Default icon
      }
    }
  
    function search(event) {
      event.preventDefault();
      const city = document.querySelector("#search-input").value;
      fetch(`${apiUrl}?query=${city}&key=${apiKey}`)
        .then(response => response.json())
        .then(updateWeather)
        .catch(error => console.error("Error fetching weather data:", error));
    }
  
    document.querySelector("#search-form").addEventListener("submit", search);
  });
  