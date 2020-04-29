
// OBJECTIVES
// finish out oneday weather with data,
  //grab lon and lat and get uv vis data(go through to get the value from the obj)
  //dynamically append to html
  //re-enable 5day fx 



var currWeatherKey = "7eb31c225242f6ad31616765e19c7464";
var lon;
var lat;
var query = "austin";
var cityArray=JSON.parse(localStorage.getItem("cities"));
  // If there's nothing in your cities array create an empty array
  if (!Array.isArray(cityArray)) {
    //if we have no scores
    cityArray = [];

  }

function submitCity(e){
  event.preventDefault();
  //grab value
  //push into array
  //$(".userform").val()
  cityArray.push($(".userform").val()
  );
  console.log(cityArray);
  //set the array to local storage
  localStorage.setItem("cities", JSON.stringify(cityArray));
 

  //call the 5day passing in the value
  fiveday($(".userform").val());
  //call the 1day passing in the value
  getWeather($(".userform").val());
  //call create cityButton
  cityButton();
  $(".userform").val("");

  
}

function cityButton(){
  var localcityArray=JSON.parse(localStorage.getItem("cities"));
  // If there's nothing in your cities array create an empty array
  if (!Array.isArray(localcityArray)) {
    //if we have no scores
    localcityArray = [];

  }
  $(".buttonarea").empty();
  for(var i=0;i<localcityArray.length;i++){
    // <button id="cityBtn" value="Austin">Austin</button>
  var btn = $("<button>");
  //<button></button>
btn.attr("id", "cityBtn");
  //<button id="cityBtn"></button>
  btn.attr("value", localcityArray[i])
  //<button id="cityBtn" value="austin"></button>
  btn.text(localcityArray[i]);
  //<button id="cityBtn" value="austin">austin</button>
  $(".buttonarea").append(btn);

  }

  //find a button with the id of cityBtn
  $("button#cityBtn").on("click", function (event) 
  {
    event.preventDefault();
    // onclick fx triggers when user clicks on citybtn
  //then get the value for that city = $(this).val()
  console.log(($(this).val()));
    //call 5day
    fiveday($(this).val());
    //call 1day
    getWeather($(this).val());
  });

  

  //.buttonarea is location to append
  //then call getlocalstorage to display all the btns
  

}


//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
function getWeather(query) {
  console.log("getweather query: "+query)
  var weatherQURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    currWeatherKey;
    console.log(weatherQURL)
  $.ajax({
    url: weatherQURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log("name:" +response.name);
    $("#current-city-weather").text(response.name);
    lat = response.coord.lat;
    lon = response.coord.lon;
    //http://api.openweathermap.org/data/2.5/uvi/forecast?appid={appid}&lat={lat}&lon={lon}&cnt={cnt}
    var uvisURL =
      "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
      currWeatherKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;
    console.log(uvisURL);
    $.ajax({
      url: uvisURL,
      method: "GET",
    }).then(function (uvobj) {
      console.log(uvobj);
    });
  });
  // // Here we are building the URL we need to query the database (one call api)
  // var weatherQURL =
  //   "https://api.openweathermap.org/data/2.5/onecall?" +
  //   "lat={lat}&lon={lon}&appid=" +
  //   currWeatherKey;
  // console.log(weatherQURL);
  // // Here we run our AJAX call to the OpenWeatherMap One Call API
  // $.ajax({
  //   url: weatherQURL,
  //   method: "GET",
  // }).then(function (response) {
  //   lon = response.coord.lon;
  //   lat = response.coord.lat;
  //   // Log the queryURL
  //   console.log(weatherQURL);
  //   // Log the resulting object
  //   console.log(response);
  //   //   add city name content to html (would also like to display corresponding icon that i noticed in api response example)
  //   $("city").html("<h1>" + response.name + " Weather Details</h1>");
  //   // add temp content to html
  //   $("#temp").text("Temperature (K) " + response.current.temp);
  //   $("#tempF").text("Temperature (F) " + tempF.toFixed(2));
  //   //   Transfer  rest of content to HTML
  //   $("#humidity").text("Humidity: " + response.current.humidity);
  //   $("#wind").text("Wind Speed: " + response.current.wind_speed);
  //   //   $.ajax({
  //   //     url: https://api.openweathermap.org/data/2.5/onecall?" +
  //   //     "lat="+lat+"&lon="+lon+"&appid=" +currWeatherKey;
  //   //     method: "GET",
  //   //   }).then(function (uvvisobj) {
  //   //   });
  //   $("#uvIndex").text("UV Index: " + response.current.uvi);
  //   // Convert the temp to fahrenheit
  //   var tempF = (response.current.temp - 273.15) * 1.8 + 32;
  //   // Log the data in the console as well
  //   console.log("Wind Speed: " + response.current.wind_speed);
  //   console.log("Humidity: " + response.current.humidity);
  //   console.log("Temperature (F): " + tempF);
  // });
}
getWeather("austin");
function fiveday(query) {
  // 5 day forecast api from OpenWeather
  var forecastApiKey = "e0b9b9e2f453ce41eb68d5ed75d073ff";
  var forecastQURL =
    "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" +
    query +
    "&appid=" +
    forecastApiKey;
  console.log(forecastQURL);
  $.ajax({
    url: forecastQURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // <div class="card">
    //      <div class="card-header">Date</div>
    //      <div class="card-body">
    //ADD THIS INTO D3!!!! <p><img src="23.png"></p>
    //           <p class="card-text">temp</p>
    //           <p class="card-text"> humidity</p>
    //      </div>
    // </div>
    
    

    for (var i = 0; i < 5; i++) {
      var d1 = $("<div>");
      //<div></div>
      d1.attr("class", "card");
      //<div class="card"></div>
      var d2 = $("<div>");
      //<div></div>
      d2.attr("class", "card-header");
      d2.text(response.list[i * 8].dt_txt.split(" ")[0]);
      var d3 = $("<div>");
      //<div></div>
      d3.attr("class", "card-body");
      var p1 = $("<p>");
      //<p></p>
      p1.attr("class", "card-text");
      p1.text("temp: " + response.list[i * 8].main.temp);
      var p2 = $("<p>");
      //<p></p>
      p2.attr("class", "card-text");
      p2.text("humidity: " + response.list[i * 8].main.humidity);
      d3.append(p1);
      //<div class="card-body">
      //<p class="card-text">temp</p>
      //</div>
      d3.append(p2);
      //<div class="card-body">
      //<p class="card-text">temp</p>
      //<p class="card-text"> humidity</p>
      //</div>
      d1.append(d2);
      d1.append(d3);
      $("#forecast-sec").append(d1);
      //date
      console.log(response.list[0].dt_txt);
      var date = response.list[0].main.temp;
      //date = date.split(" ")[0];
      //pic
      //temp
      console.log(date);
      //humidity
      console.log(response.list[0].main.humidity);
    }
    $(".forecast").html("<h2>" + "5-Day Forecast</h2>");
    //   how do i make sure this shows up in the correct spot on the html page?
  });
}
//fiveday("austin");

cityButton();




