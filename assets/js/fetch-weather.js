const lat = 37.3856992;
const lon = -77.6971656;
const url = `https://api.weather.gov/gridpoints/AKQ/37,69/forecast/hourly`;

const weatherSection = document.getElementById("weather-data");

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    weatherSection.innerText = JSON.stringify(data, null, 2); // Display the data as formatted JSON for readability
  })
  .catch((error) =>
    console.error("Error fetching weather data by coordinates:", error)
  );
