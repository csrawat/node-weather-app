const express = require('express');
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js');
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

// app.com
// app.com/help
// app.com/about
//app.com/weather

// Define path for Express config
pathToStaticDir = path.join(__dirname,'../public');
pathToViews = path.join(__dirname, '../templates/views');
pathToPartials = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', pathToViews);
hbs.registerPartials(pathToPartials);

//Setup static directory to serve
app.use(express.static(pathToStaticDir));

app.get('', (req,res) => {
  res.render('index',{
    title: 'Weather App',
    name: 'Chandra Rawat'
  });
})

app.get('/about', (req,res) => {
  res.render('about',{
    title: 'About me',
    name: 'Chandra Rawat'
  });
})

app.get("/help", (req, res) => {
  res.render('help', {
    title: "Hello! How may I help you?",
    name: "Chandra Rawat",
  });
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'Provide some valid address!'
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error){
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get("/help/*", (req,res) => {
  res.render('404',{
    title: 'Error Page',
    errorMessage: 'Help article not found.'
  });
})

app.get("*", (req,res) => {
  res.render('404',{
    title: 'Error Page',
    errorMessage: 'Page not found!'
  });
})

app.listen(port,() => {
    console.log("Server running on port " + port);
})
