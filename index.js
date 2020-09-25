require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const path = require("path")

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended : true}))

app.use("/", express.static(path.join(__dirname, "/public")))

app.post("/", (req, res) => {

    const query = req.body.cityName;
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.API_ID}&units=${unit}`

    https.get(url, (response) =>{
        response.on("data", (data) => {
            const weatherInfo = JSON.parse(data)
            const temp = weatherInfo.main.temp
            const city = weatherInfo.name
            const weatherDescription = weatherInfo.weather[0].description
            const icon = weatherInfo.weather[0].icon
            const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.render("index", {city : city, temp : temp, weatherDescription : weatherDescription, image : image})
        })
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server live at port ${port}`)
})