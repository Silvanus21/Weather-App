require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const path = require("path");
const fetch = require("node-fetch")

// initialising express app
const app = express();

// setting view engine as ejs
app.set("view engine", "ejs");

// parsing the body values
app.use(bodyParser.urlencoded({ extended: true }));

// adding static files
app.use("/", express.static(path.join(__dirname, "/public")));

// initial page
app.get("/", (req, res) => {
  res.render("homePage");
});

// post method for result page
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const unit = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.API_ID}&units=${unit}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weatherInfo = data;
      const temp = weatherInfo.main.temp;
      const city = weatherInfo.name;
      const weatherDescription = weatherInfo.weather[0].description;
      const icon = weatherInfo.weather[0].icon;
      const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.render("index", {
        city: city,
        temp: temp,
        weatherDescription: weatherDescription,
        image: image,
      });
    })
    .catch((error) => {
      if (error) {
        res.render("citynameError", {query});
      }
    });
});

// error page
app.use((req, res) => {
  res.render("error");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server live at port ${port}`);
});
