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
  console.log("This is a request body", req.body);
  let zipCode = req.body.zipCodeInput;
  const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
  const apiKey = `&appid=${process.env.WEATHER_KEY}&units=imperial`;
  apiUrl = baseUrl + zipCode + apiKey;
  console.log("apiUrl is aiosudhiasuhdiaus" + apiUrl);
  axios
    .get(apiUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log("error is " + error);
    });
});

app.get("/weather", (req, res) => {
  axios
    .get(apiUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
      console.log("search location error");
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});

let apiUrl;
