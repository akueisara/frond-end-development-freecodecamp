$(document).ready(function() {

  getLocation();

  function getLocation() {
    $.get("http://ip-api.com/json", function(location) {
      console.log(location);
      
	  if(location.country === "United States") {
		$('.location')
			.append(location.city + ", ")
			.append(location.region);
	  }
	  else {
		$('.location')
			.append(location.city + ", ")
			.append(location.country);  
	  }

      var units = getUnits(location.countryCode);
      getWeather(location.lat, location.lon, units);

      //return weather;

    }, "jsonp");

  }
  

  function getWeather(lat, lon, units) {
    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units + '&APPID=';

    console.log(weatherApiUrl);

    $.get(weatherApiUrl, function(weather) {
      var temperature = Math.round(weather.main.temp);
      var unitLabel;

      //label based in imperial vs metric units
      if (units === "imperial") {
        unitLabel = "F";
      } else {
        unitLabel = "C";
      }
	
      console.log(weather); 
	  
	  	var imgs = ['url("http://i.imgur.com/eI5KLUW.jpg")', 'url("http://i.imgur.com/rG0P1ro.jpg")', 'url("http://i.imgur.com/voCuONs.jpg")', 'url("http://i.imgur.com/5tFHSKa.jpg")', 'url("https://rainymood.com/i/b/67.jpg")'];
    // Select custom backgroudn image according to temperature range.
	
	switch (unitLabel) {
      case 'F':
        var temps = [90, 70, 32]
        break
      case 'C':
        temps = [32, 21, 0]
        break
    }
	if (temperature >= temps[0]) {
		$('body').css('background-image', imgs[0]);
    } else if (temperature < temps[0] && temperature >= temps[1]) {
      $('body').css('background-image', imgs[1]);
    } else if (temperature < temps[1] && temperature >= temps[2]) {
      $('body').css('background-image', imgs[2]);
    } else if (temperature < temps[2]) {
      $('body').css('background-image', imgs[3]);
    }
	
	if(weather.weather[0].description.includes("rain"))
		$('body').css('background-image', imgs[4]);
	
      $('.icon')
        .append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");
      $('.temp').append(temperature + " &#176;");
	  $('.tempunit').append(" <a>" + unitLabel + "</a>");
      $('#conditions').append(weather.weather[0].description);
	  $(".tempunit").on('click', function() {
		  if (unitLabel == "C") {
			unitLabel = "F";
			temperature = Math.round(temperature*9/5 + 32);
			$('.temp').html(temperature + " &#176;");
			$('.tempunit').append("<a>" + unitLabel + "</a>");
		} else {
			unitLabel = "C";
			temperature = Math.round((temperature -32)*5/9);
			$('.temp').html(temperature + " &#176;");
			$('.tempunit').append(" <a>" + unitLabel + "</a>");
		} 
	  });
	  
    }, "jsonp");

  };

  function getUnits(country) {
    var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];

    if (imperialCountries.indexOf(country) === -1) {
      var units = 'metric';
    } else {
      units = 'imperial';
    }

    console.log(country, units);
    return units;
  }

});
