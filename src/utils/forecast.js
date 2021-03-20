const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=956aa8e2c2191f0f8b6aa56fa7a9c07b&query=' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        ' It is currently ' +
          body.current.temperature +
          ' degress out. There is a ' +
          body.current.precip +
          '% chance of rain.'
      );
    }
  });
};

module.exports = forecast;
