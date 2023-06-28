const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

exports.handler = async function (event) {
  const { cityName, unit } = JSON.parse(event.body);

  const apiKey = `&appid=${process.env.WEATHER_KEY}`;
  const unitsFormat = `&units=${unit}`;

  // First API URL is to fetch data based on the city location from the body request,
  // that will be used to get coordinates and call a second API endpoint.
  const baseUrl1 = "http://api.openweathermap.org/data/2.5/weather?q=";
  const apiUrl1 = baseUrl1 + cityName + apiKey + unitsFormat;

  try {
    const currentWeatherResponse = await axios.get(apiUrl1);
    const coordinates = currentWeatherResponse.data.coord;
    const baseUrl2 = "https://api.openweathermap.org/data/2.5/onecall?";
    const part = "minutely,alerts";
    const coord = `lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${part}`;

    // The second API URL we use the coordinates obtained from first API URL
    // to get latitude and longitude, which we use for this endpoint.
    // Based on lat and lon, we can get the forecast data, plus current weather data.
    const apiUrl2 = baseUrl2 + coord + apiKey + unitsFormat;

    const forecastResponse = await axios.get(apiUrl2);
    // Here we are first combining the data from first and second API URLs,
    // then we send the response.
    const allData = {
      currentWeatherData: currentWeatherResponse.data,
      forecastData: forecastResponse.data,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(allData),
    };
  } catch (error) {
    console.log("error is " + error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
