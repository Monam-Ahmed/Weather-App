const { Console } = require("console");
const express = require("express");
const https = require("https");
const { parse } = require("path");
const  bodyPArser = require("body-parser");

const app =express();

app.use(bodyPArser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/index.html" )

});
app.post("/",function(req,res){
   
    const query = req.body.cityName;
    const apiKey ="96b9966d3575a74729c8f0265fcf8fa1"; 
   
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apiKey+"&units=metric";
  
    https.get(url, function(response)
    {
        console.log(response.statusCode);

        response.on("data",function(data)
        {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write("<p>The weather is currently " + description+"</p>");
            res.write("<h1> The temprature "+ query+" is " + temp + " degree Celcius </h1>" );
            res.write("<img src = "+imageURL +">");
            res.send();
           
            // const object = {
            // name:"Monam",
            // favouriteFood: "Pasta"
        
            // }
            // console.log(JSON.stringify(object));
        });
        
       

    });
    
})




app.listen(3000,function()
{
    console.log("The server is running on post 3000"); 
});