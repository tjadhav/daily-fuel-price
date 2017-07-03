(function(window, document) {
  'use strict';

  function storeLocation(state, city) {
    localStorage.setItem('city', city);
    localStorage.setItem('state', state);
  }
  function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      var geocodingAPI = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ', ' + longitude + '&sensor=false';

      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function() {
        var location = JSON.parse(this.response);
        if (location.results[0]) {
          var add = location.results[0].formatted_address;
          var value = add.split(',');
          var count = value.length;
          var city = value[count - 3].trim();
          var state = location.results[0].address_components.find(o => o.types.indexOf('administrative_area_level_1') !== -1).short_name.toLowerCase();

          if (stateCached === state && cityCached === city) {
            return false;
          }

          getPetrolPrice(state, city);
          storeLocation(state, city);
        }
      });

      xhr.open('GET', geocodingAPI);
      xhr.send();
    }, function(e) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function() {
        var response = JSON.parse(this.response);
        getPetrolPrice(response.region, response.city);

        storeLocation(response.region, response.city);
      });
      xhr.open('GET', 'https://ipinfo.io/json');
      xhr.send();
    });
  }

  function getPetrolPrice(state, city) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {
      var response = JSON.parse(this.response);

      if (response) {
        document.getElementById('city').textContent = city;
        document.getElementById('petrol-price').textContent = response.price;

        var change = Number(response.change);
        document.getElementById('change').classList.add(change > 0 ? 'increased' : 'decreased');
        document.getElementById('change').innerHTML = (change > 0 ? '&#9650;' : '&#9660;') + response.change;
        document.getElementById('body').style.display = 'flex';
      } else {
        document.getElementById('notAvailable').style.display = 'flex';
      }
      document.getElementById('loader').style.display = 'none';
    });

    xhr.open('GET', 'https://daily-fuel-price-server.herokuapp.com/petrol-price/' + state + '/' + city);
    xhr.send();
  }

  var stateCached = localStorage.getItem('state');
  var cityCached = localStorage.getItem('city');

  if (stateCached && cityCached) {
    getPetrolPrice(stateCached, cityCached);
  }
  getLocation();
}(window, document));
