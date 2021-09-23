// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Use API routes from the api folder
// app.use("/routes/api", require("./routes/api"));

// app.get("/", (req, res) => {
//   res.send("PORT 5000");
// });

// app.listen(port, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Listening on port " + port);
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./../../../.env" });
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());
let port = 5000;

app.get("/", (req, res) => {
  res.send("This is a weather app server");
});

app.post("/search-location", (req, res) => {
  const zipCode = req.body.zipCodeInput;
  const unit = req.body.unit;

  const apiKey = `&appid=${process.env.WEATHER_KEY}`;
  const unitsFormat = `&units=${unit}`;
  const baseUrl1 = "http://api.openweathermap.org/data/2.5/weather?zip=";
  const baseUrl2 = "https://api.openweathermap.org/data/2.5/onecall?";
  const part = "minutely,alerts";
  const apiUrl1 = baseUrl1 + zipCode + apiKey + unitsFormat;
  axios
    .get(apiUrl1)
    .then((currentWeatherResponse) => {
      const coordinates = currentWeatherResponse.data.coord;
      const coord = `lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${part}`;
      const apiUrl2 = baseUrl2 + coord + apiKey + unitsFormat;

      axios.get(apiUrl2).then((forecastResponse) => {
        const allData = {
          currentWeatherData: currentWeatherResponse.data,
          forecastData: forecastResponse.data,
        };
        res.json(allData);
      });
    })
    .catch((error) => {
      console.log("error is " + error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
