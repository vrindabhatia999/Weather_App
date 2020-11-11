//elements
const iconElement=document.querySelector(".weather-icon");
const tempElement=document.querySelector(".temperature-value p");
const descElement=document.querySelector(".temperature-desc p");
const locationElement=document.querySelector(".location p");
const notificationElement=document.querySelector(".notification");
const wind=document.querySelector(".temp-wind");

//app data
const weather={};
weather.temperature={
    unit:'celcius'
}

const KELVIN=273;

//API KEY
const key="f35525fd08d7b51b4427b93c9e1e6b6f";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display='block';
    notificationElement.innerHTML='<p>Browser<p>';

}

function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;

    getWeather(latitude,longitude);
}

function showError(error){
    notificationElement.style.display='block';
    notificationElement.innerHTML=`<p> ${error.message}</p>`;
}

function getWeather(latitude,longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0d3b93a41b932276b58be0fb36afadef`;
    fetch(api)
       .then(function(response){
           let data=response.json();
           return data;
       })
       .then(function(data){
           weather.temperature.value=Math.floor(data.main.temp -KELVIN);
           weather.description=data.weather[0].icon;
        //    weather.iconId=data.weather[0].icon;
           weather.city=data.name;
           weather.country=data.sys.country;
           weather.wind=data.wind.speed;
           weather.desc=data.weather[0].description;



       })
       .then(function(){
           displayWeather();
       });
}

function displayWeather(){
    // iconElement.innerHTML=`<img src="${weather.iconId}.svg"/>`;
    tempElement.innerHTML="<h5>Temperature:</h5>"+`${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML="<h5>Weather description:</h5>"+weather.desc;
    locationElement.innerHTML="<h5>Location:</h5>"+`${weather.city},${weather.country}`;
    wind.innerHTML="<h5>Wind Speed:</h5>"+weather.wind;

}

//c to f
function celsiusToFahrenheit(temperature){
    return (temperature*9/5)+32;

}