const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");


const { get } = require("express/lib/response");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html")

});

app.post("/",function(req,res){
    const q = req.body.cityName;
    const url  ="https://api.openweathermap.org/data/2.5/weather?q="+q+"&appid=f2227493ddfc997e2bdadf6029d1cc04&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desp = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon

            const icon_url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        
            res.write("<h1>The temperature in "+q+" is " + temp + " degree Celcius</h1>")
            res.write("<p>The weather is like "+ desp + "</p>")
            res.write("<img src="+icon_url+">")
            res.send();
        })
    })
})


app.listen(6900,function(){
    console.log("Welcome to 69");
})