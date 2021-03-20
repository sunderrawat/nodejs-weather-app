const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirPath = path.join(__dirname, '../public');

const app = express();
app.set('views', path.join(__dirname, '../templates/views')); //if you get an error than run this command
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, '../templates/partials'));
console.log(path.join(__dirname, '../views'));
app.listen(3000, () => {
  console.log('app is started on port 3000');
});

//static page load
app.use(express.static(publicDirPath));

//render dynamic pages from hbs
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'sunder rawat',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Sunder Rawat',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'sunder rawat',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   address: req.query.address,
  //   state: req.query.state,
  // });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error !',
    name: 'Sunder Rawat',
  });
});

//express routing
// app.get("", (req, res) => {
//   res.send("<h1>Hello Express!</h1>");
// });

// app.get("/about", (req, res) => {
//   res.send([
//     {
//       name: "sunder",
//       age: 25,
//     },
//     {
//       name: "bhavik",
//       age: 4,
//     },
//   ]);
// });

// app.get("/help", (req, res) => {
//   res.send("how can we help you");
// });

// app.get('/weather', (req, res) => {
//   res.send('You are on weather Page');
// });
