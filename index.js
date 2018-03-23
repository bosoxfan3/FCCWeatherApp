let latitude;
let longitude;
let temperature;

function getLocation() {
  $('#loading').html('<h3>Searching for your location. This may take a minute. Be sure to enable location services!</h3>');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = Math.floor(position.coords.latitude);
      longitude = Math.floor(position.coords.longitude);
      if (latitude !== null && longitude !== null) {
        $('.js-weather-button').removeAttr('hidden');
        $('#loading').html('<h3>Location found!</h3>');
      }
    });
  }
}

$(document).ready(function() {
  getLocation();
  $('.js-weather-button').click(function() {
    $('#loading').attr('hidden', true);
    if (latitude !== null && longitude !== null) {
      let url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
      $.getJSON(url, function(data) {
        let imageURL = `src=${data.weather[0].icon}`;
        temperature = data.main.temp;
        $('#results').html(
          `<h3>${data.name}, ${data.sys.country}</h3>
           <p>${data.weather[0].description.toUpperCase()}</p>
           <img ${imageURL} alt="weather logo" />
           <p id="temperature">${temperature}°C</p>`
        );
        $('.js-convert-button').removeAttr('hidden');
      });
    }
  });
  $('.js-convert-button').click(function() {
    if ($('#temperature').text().includes('C')) {
      temperature = (temperature*1.8)+32;
      $('#temperature').text(`${temperature}°F`);
    } else {
      temperature = (temperature-32)*(5/9);
      $('#temperature').text(`${temperature}°C`);
    }
  });
});