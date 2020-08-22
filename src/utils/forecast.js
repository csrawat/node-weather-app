const request = require("request");

const forecast = (latitude,longitude,callback) => {
    const url =
      "http://api.weatherstack.com/current?access_key=688aabf66a77ba6c71b2d9411ada8927&query=" + latitude + "," + longitude;

    request({url,json:true}, (error,{body}) => {
        if(error){
           callback("Unable to connect to weather service!",undefined);
        }
        else if(body.error){
            callback("Unable to find location",error);
        }
        else{
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const humidity = body.current.humidity;
            callback(undefined,
            `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. And the humidity is ${humidity}.`
            );
        }
    })
}

module.exports = forecast;

