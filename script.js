let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".city_name");

const form = document.querySelector("form");
const API_KEY =  `c82f6edc72a26f90bf4f1dfdfee193ef`;

// const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

// document.addEventListener("DOMContentLoaded",()=>{
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//         //   console.log(position.coords.latitude);

//           const { latitude, longitude } = position.coords;
//             getCurrentCity(latitude,longitude,(cityVal)=>{
//             getWeather(cityVal);
//          });       
//         },
//         (error) => {
//           alert(error.message);
//         }
//       );
//     } else {
//       console.log("Geolocation is not supported by this browser.");
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
      getWeather(`delhi`);
});


let getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      showWeather(data);
  } catch (err) {
      console.log(err.message);
      // Handle error here, e.g. by showing an error message to the user
  }
}

let getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

let getCurrentDateTime = (dt) => {
    let currDate = new Date(dt * 1000);
  
    let options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  
    return new Intl.DateTimeFormat("en-US", options).format(currDate);
  };

let showWeather = (data) => {
     if(data.cod == '404'){
        alert('City not found!!')
        return;
      };
    
    const { main, name, weather, wind, dt, sys } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = `${getCurrentDateTime(dt)}`;
    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
    w_temperature.innerHTML = `${(main.temp).toFixed(0)}&#176C`;
    w_minTem.innerHTML = `MIN : ${(main.temp_min).toFixed(2)}&#176C`;
    w_maxTem.innerHTML = `MAX : ${(main.temp_max).toFixed(2)}&#176C`;
    w_feelsLike.innerHTML = `${(main.feels_like).toFixed(2)}&#176C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${(wind.speed)} Km/h`;
    w_pressure.innerHTML = `${main.pressure} hPa`;

}

form.addEventListener(
    "submit",
    function(event){
        getWeather(citySearch.value);
        event.preventDefault();
        citySearch.value = "";
    }
);


// let getCurrentCity = async (lat,long,callback) =>{
//     const city_url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=${1}&appid=${API_KEY}`;
   
//     const response_live = await fetch(city_url);
//      const live_data = await response_live.json();
//     //  console.log(live_data);

    
//     callback(live_data[0].name);   
// }

