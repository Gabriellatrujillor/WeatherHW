
var currWeatherKey = "9cade5321697ab8dfb6707a785178c59";
var lon;
var lat;
var query = "";
var cityArray = JSON.parse(localStorage.getItem("cities"));
if (!Array.isArray(cityArray)) {
  cityArray = [];
}
// DISPLAY THE CURRENT DATE
var displayDay = moment().format("MMM Do, YYYY");
$("#current-day").append(" " + displayDay);
function submitCity(e) {
  event.preventDefault();
  var usercity = $(".userform").val().trim();
  if (usercity.length) {
   cityArray.push(usercity);
    localStorage.setItem("cities", JSON.stringify(cityArray));
    fiveday(usercity);
    getWeather(usercity);
    cityButton();
    $(".userform").val("");
  }
}
function cityButton() {
  var localcityArray = JSON.parse(localStorage.getItem("cities"));
  if (!Array.isArray(localcityArray)) {
    localcityArray = [];
  }
  $(".buttonarea").empty();
  for (var i = 0; i < localcityArray.length; i++) {
    var btn = $("<button>");
    btn.attr("id", "cityBtn");
    btn.attr("value", localcityArray[i]);
    btn.text(localcityArray[i]);
    $(".buttonarea").append(btn);
  }
  $("button#cityBtn").on("click", function (event) {
    event.preventDefault();
    fiveday($(this).val());
    getWeather($(this).val());
  });
}
function getWeather(query) {
  var weatherQURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    currWeatherKey;
  $.ajax({
    url: weatherQURL,
    method: "GET",
  }).then(function (response) {
    $("#current-city-weather").text(response.name);
    var temp = response.main.temp;
    var tempF = (temp - 273) * 1.8 + 32;
    $("#Temp").text("Temperature: " + tempF.toFixed() + " F");
    $("#Humidity").text("Humidity: " + response.main.humidity + "%");
    $("#WindSpeed").text("Wind Speed: " + (response.wind.speed*2.237).toFixed(2)
    + "mph");
    lat = response.coord.lat;
    lon = response.coord.lon;

    var img=$("<img>");
    img.attr("src", "http://openweathermap.org/img/wn/"+response.weather[0].icon+".png");
    img.attr("id", "mainWeatherImg");
    $("#current-city-weather").append(img);

    var uvisURL =
      "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
      currWeatherKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;
    $.ajax({
      url: uvisURL,
      method: "GET",
    }).then(function (uvobj) {
      console.log(uvobj);
      $("#uvIndex").text("UV Index: " + uvobj[0].value);
      
    });
  });
}
function fiveday(query) {
  
  var forecastApiKey = "87c1321c379a2aaa5caef175776e2f8b";
  var forecastQURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    query +
    "&appid=" +
    forecastApiKey;
  $.ajax({
    url: forecastQURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // $("#forecast-sec").empty();
    
    for (var i = 1; i < 6; i++) {
      var d1 = $("<div>");
      d1.attr("class", "card");

      var d2 = $("<div>");
      d2.attr("class", "card-header");

      var currentdate = response.list[i * 8].dt_txt.split(" ")[0];
      d2.text(moment(currentdate).format("MMMM Do, YYYY"));

      var d3 = $("<div>");
      d3.attr("class", "card-body");

      var p1 = $("<p>");
      p1.attr("class", "card-text");

      var temp5Day = response.list[i * 8].main.temp;
      var temp5DayF = (temp5Day - 273) * 1.8 + 32;
      p1.text("Temp: " + temp5DayF.toFixed() + " F");
      var p2 = $("<p>");
      p2.attr("class", "card-text");
      p2.text("Humidity: " + response.list[i * 8].main.humidity + "%");

      d3.append(p1);
      d3.append(p2);
      d1.append(d2);
      d1.append(d3);
      $("#forecast-sec").append(d1);

      var date = response.list[0].main.temp;
  
      var iconurl =
        "http://openweathermap.org/img/w/" +
        response.list[i * 8].weather[0].icon +
        ".png";

      var img = $("<img>");
      img.attr("src", iconurl);
      img.attr("id", "weathericon");
      d1.append(img);
    }
    $(".forecast").html("<h2>" + "5-Day Forecast</h2>");
  });
}
cityButton();