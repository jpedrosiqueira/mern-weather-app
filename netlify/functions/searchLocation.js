const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

module.exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST" && event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST",
  };

  try {
    const { cityName, unit } = JSON.parse(event.body);

    const apiKey = `&appid=${process.env.WEATHER_KEY}`;
    const unitsFormat = `&units=${unit}`;

    const baseUrl1 = "http://api.openweathermap.org/data/2.5/weather?q=";
    const apiUrl1 = baseUrl1 + cityName + apiKey + unitsFormat;

    const currentWeatherResponse = await axios.get(apiUrl1);
    const coordinates = currentWeatherResponse.data.coord;
    const baseUrl2 = "https://api.openweathermap.org/data/2.5/onecall?";
    const part = "minutely,alerts";
    const coord = `lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${part}`;
    const apiUrl2 = baseUrl2 + coord + apiKey + unitsFormat;

    const forecastResponse = await axios.get(apiUrl2);
    const allData = {
      currentWeatherData: currentWeatherResponse.data,
      forecastData: forecastResponse.data,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(allData),
    };
  } catch (error) {
    console.log("error is", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
