
// OBJECTIVES
// finish out oneday weather with data,
  //grab lon and lat and get uv vis data(go through to get the value from the obj)
  //dynamically append to html
  //re-enable 5day fx 
  // HAVE IF STATMENET FOR NULL - if searchbox element == return



var currWeatherKey = "dac12dbdd66b32822c9dde5d1340c3e7";
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
    var temp = respone.main.temp;
    var tempF = (temp-273) * 1.8 + 32;
    $("#Temp").text("Temperature: " + tempF.toFixed() + " F");
    $("#Humidity").text("Humidity " + response.main.humidity + " %");
    $("#WindSpeed").text("Wind Speed: " + response.wind.speed + "mph");


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
      $("#uvIndex").text("UV Index")
    });
  });
 
}

getWeather("austin");
function fiveday(query) {
  // 5 day forecast api from OpenWeather
  var forecastApiKey = "13414e8c24e3fa7f23ad04f011cb28f5";
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
    $("#forecast-sec").empty();

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
      var temp5Day = response.list[i * 8].main.temp;
      var temp5DayF = (temp5Day - 273) * 1.8 + 32;

      p1.text("Temp: " + temp5DayF.toFixed() + " F");
      var p2 = $("<p>");
      //<p></p>
      p2.attr("class", "card-text");
      p2.text("Humidity: " + response.list[i * 8].main.humidity);
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
      $("#forecast-sec").prepend(d1);
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
  });
}

cityButton();




