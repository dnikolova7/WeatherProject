const express = require ("express");
const https = require ("https");
// const { send } = require("process");
// import ('node-fetch');
const bodyParser = require ("body-parser");

const app = express ();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");

    // res.send("Server is up and running");
})

app.post ("/", function(req, res){
   
    const query = req.body.cityName;
    const apiKey = "b813ad9ec2d7b9fb72fcfd6c0804416a";
// const units = "Celsius";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
// let settings = { method: "Get" };

// fetch(url, settings)
// .then(res => res.json())
// .then((json) => {
//     console.log(json);
    // do something with JSON
// });

    https.get(url, function(response){
        console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
       
        const desc = weatherData.weather[0].description;

        const icon = weatherData.weather[0].icon

        const iconImage = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

        res.write ("<h1>The temperature in " + query + " is " + temp + " degrees Celsius."+ "<p>The weather is currently " + desc + ". </h1>" );
        res.write ("<img src = " + iconImage + ">");
        res.send();
        
    });
});

});


app.listen(3000, function(){
    console.log ("I am port 3000");
});

