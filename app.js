

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

 const app = express();
 app.use(bodyParser.urlencoded({ extended: true}));

 app.get("/",function(req,res){
     res.sendFile(__dirname + "/index.html");
     
 });

app.post("/",function(req,res){
    const query=req.body.CityName;
     const appKey="f05b47118fae520c0054a4849395fd80";
     const unit="metric";
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appKey+"&units="+unit;
     https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp=weatherData.main.temp;
            const descp=weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const url= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+ query+ " is " + temp + "degrees Celcius</h1>");
            res.write("<p>Weather is currently "+descp + "</p>");
            res.write("<img src="+url+">");
            res.send();
        })
     })
})

 app.listen(3000,function(req,res){
     console.log("server is running at port 3000");
 });