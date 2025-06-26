function fetchForecast(location, days, apiKey) {
    // Construct the API URL for the forecast
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=${days}&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Process the forecast data and update the UI
        displayForecast(data.list);
      })
      .catch(error => {
        console.error("Error fetching forecast:", error);
        // Handle the error gracefully
      });
  }
  
  function displayForecast(forecastData) {
    const container = document.getElementById("forecast");
    // Clear the container if necessary
    container.innerHTML = "";
  
    forecastData.forEach(day => {
      // Extract relevant information from each day's data
      const date = new Date(day.dt * 1000);
      const temperature = day.temp.day;
      const icon = day.weather[0].icon;
      const description = day.weather[0].description;
  
      // Create HTML content for each day's forecast
      const forecastCard = `
        <div class="forecast-card">
          <p>${date.toDateString()}</p>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
          <p>Temp: ${temperature}°C</p>
          <p>${description}</p>
        </div>
      `;
  
      // Add the forecast card to the container
      container.innerHTML += forecastCard;
    });
  }
  