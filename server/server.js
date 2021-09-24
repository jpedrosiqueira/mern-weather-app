const express = require("express");
const cors = require("cors");
const app = express();
const searchLocationRoute = require("./routes/api/searchLocation");

app.use(cors());
app.use(express.json());
let port = 5000;

app.get("/", (req, res) => {
  res.send("This is a weather app server");
});

app.use(searchLocationRoute);

app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
