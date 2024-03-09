import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import humidity_icon from "../Assets/humidity.png";
import snow_icon from "../Assets/snow.png";
import clouds_icon from "../Assets/clouds.png";
import mist_icon from "../Assets/mist.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import wind_icon from "../Assets/wind.png";


const WeatherApp = () => {

  let api_key ="7daaa9ea0944d9b5952e09332434cfe3";

  const [wicon, setWicon] = useState(clouds_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if(element[0].value==="")
    {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/p";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
    location[0].innerHTML = data.name;

    if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
    {
      setWicon(clear_icon);
    }
    else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
    {
      setWicon(clouds_icon);
    }
    else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
    {
      setWicon(drizzle_icon);
    }
    else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n")
    {
      setWicon(rain_icon);
    }
    else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n")
    {
      setWicon(mist_icon);
    }
    else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n")
    {
      setWicon(snow_icon);
    }
    else{
      setWicon(clouds_icon);
    }

  }

  return (
    <div className='container'>
      <div className="top-bar">
        <input className="cityInput" type="text" placeholder="Search"/>
        <div className='search-icon'>
          <img src={search_icon} alt="Search Icon" onClick={()=>{search()}}/>   
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="Cloudy Icon" />
      </div>
      <div className="weather-temp">20°</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt='' className='icon' />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt='' className='icon' />
          <div className="data">
            <div className="wind-rate">18 km/p</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp;
