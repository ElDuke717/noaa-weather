// import the API key and MAC address from the .env file
require("dotenv").config();
const API_KEY = process.env.AW_API_KEY;
const MAC_ADDRESS = process.env.STATION_MAC_ADDRESS;
const APP_KEY = process.env.APPLICATION_KEY;

console.log(API_KEY);
console.log(MAC_ADDRESS);
console.log(APP_KEY);

// Call the API and log the response to the console
const axios = require("axios");

const URL = `https://api.ambientweather.net/v1/devices/${MAC_ADDRESS}?apiKey=${API_KEY}&applicationKey=${APP_KEY}
`;

axios
  .get(URL)
  .then((response) => {
    console.log("Weather Data:", response.data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
