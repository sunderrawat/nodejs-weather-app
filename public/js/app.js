console.log('javascript from client side');
// fetch(
//   'http://api.weatherstack.com/current?access_key=956aa8e2c2191f0f8b6aa56fa7a9c07b&query=satnali'
// ).then(response => {
//   //   console.log(response)
//   response.json().then(data => {
//     console.log(data.current.temperature);
//     console.log(data);
//   });
// });

const form = document.querySelector('form');
const input = document.querySelector('input');
const locationText = document.querySelector('#message-1');
const forecastText = document.querySelector('#message-2');

form.addEventListener('submit', e => {
  e.preventDefault();
  const location = input.value;
  forecastText.textContent = '';
  locationText.textContent = 'Loading...';
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        input.value = '';
        return locationText.textContent = data.error;
      } else {
        forecastText.textContent = data.forecast;
        locationText.textContent = data.location;
        input.value = '';
      }
    });
  });
});
