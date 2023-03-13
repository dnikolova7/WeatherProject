const express = require ("express");
const https = require ("https");
import ('node-fetch');

const app = express ();

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=42.698334&lon=23.319941&appid=b813ad9ec2d7b9fb72fcfd6c0804416a&units=metric";
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
            console.log(weatherData);
            
        });
});

    res.send("Server is up and running");
})

app.listen(3000, function(){
    console.log ("I am port 3000");
});

