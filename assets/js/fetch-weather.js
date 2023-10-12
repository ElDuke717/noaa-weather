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
    displayData(data);
  })
  .catch((error) => console.error("Error fetching weather data:", error));

function displayData(data) {
  // Extract the first 20 periods
  const periods = data.properties.periods.slice(0, 20);

  // Iterate over the 20 periods
  periods.forEach((period) => {
    // Create a container for each period
    const periodDiv = document.createElement("div");
    periodDiv.className = "period";

    // Add details from each period to the container
    periodDiv.innerHTML = `
            <hr />
            <h2>${period.name}</h2>
            <h2>${formatDate(period.startTime)}</h2>
            <p>Temperature: ${period.temperature}°${period.temperatureUnit}</p>
            <p>Humidity:${period.relativeHumidity.value}%</p>
            <p>${period.shortForecast}</p>
            <p>Wind: ${period.windSpeed} ${period.windDirection}</p>
            <img class="weather-img" src="${period.icon}" alt="${
      period.shortForecast
    }" width="100">
            <p>Chance of Precipitation ${
              period.probabilityOfPrecipitation.value
            }%
        `;

    // Append the container to the weather section
    weatherSection.appendChild(periodDiv);
  });
}

function formatDate(startTime) {
  // Convert the ISO string to a Date object
  const startDate = new Date(startTime);

  // Extract the date components
  const day = startDate.getDate();
  const month = startDate.getMonth() + 1; // Months are 0-based
  const year = startDate.getFullYear();

  // Extract the hour and convert it to 12-hour format
  let hour = startDate.getHours();
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'

  // Calculate the end hour for the 7-hour span
  const endHourRaw = startDate.getHours() + 7;
  const endHour = endHourRaw % 12;
  const endAmpm = endHourRaw >= 12 ? "pm" : "am";

  return `${month}-${day}-${year} ${hour}${ampm}`;
}
