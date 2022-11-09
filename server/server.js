const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const searchLocationRoute = require("./routes/api/searchLocation");

app.use(cors());
app.use(express.json());
let port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.send("This is a weather app server");
});

app.use(searchLocationRoute);

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
