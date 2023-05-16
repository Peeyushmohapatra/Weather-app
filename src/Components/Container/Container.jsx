import React, { useEffect, useRef, useState } from "react";
import "./Container.css";
import RightContainer from "../RightContainer/RightContainer";
import { apiCall } from "../../function";
import Clear_night from "../../Images/Clear_night_image.jpg";
import Clear_morning from "../../Images/Clear_Weather.jpg";
import Cloud_night from "../../Images/clouds_night.jpg";
import Cloud_morning from "../../Images/Clouds_weather.jpg";
import Fog_night from "../../Images/Fog_night_image.jpg";
import Haze_night from "../../Images/Haze_night_img.jpg";
import Haze_morning from "../../Images/Haze_weather.jpg";
import Initaial from "../../Images/Main.jpg";
import Mist_night from "../../Images/Mist_night_image.jpg";
import Mist_morning from "../../Images/Mist_weather.jpg";
import Rainy_morning from "../../Images/Rainy_Day_image.jpg";
import Rainy_night from "../../Images/Rainy_night_image.jpg";
import Smoky_night from "../../Images/Smoke_night_image.jpg";
import Smoky_morning from "../../Images/Smoke_Weather.webp";
import Snow_night from "../../Images/Snow_night_image.jpg";
import Snow_morning from "../../Images/Snow_weather.jpg";
import Sunny from "../../Images/Sunny_weather.jpg";

const Container = () => {
  const [date, setDate] = useState(new Date());
  const [temp, setTemp] = useState("ll||ll");
  const [input, setInput] = useState();
  const [apiData, setApidata] = useState([]);
  const [wallpaper, setWallpaper] = useState();
  const [dayWallpaper, setDaywallpaper] = useState([
    Clear_morning,
    Cloud_morning,
    Haze_morning,
    Mist_morning,
    Rainy_morning,
    Smoky_morning,
    Snow_morning,
    Sunny,
  ]);
  const [nightWallpaper, nightDaywallpaper] = useState([
    Clear_night,
    Cloud_night,
    Fog_night,
    Haze_night,
    Mist_night,
    Rainy_night,
    Smoky_night,
    Snow_night,
    Sunny,
  ]);
  const [backgroundColor,setbackgroundColor] = useState("rgba(221, 225, 227, 0.441)")
  const [backgroundColor2,setbackgroundColor2] = useState("rgba(221, 225, 227, 0.441)")
  const [myWallpaper, setMywallpaper] = useState(Initaial);
  const [weatherStatus, setWeatherStatus] = useState(); //--------------------
  const ref = useRef()
  let time = date.getHours();

  useEffect(() => {
    if (time >= 5 && time <= 17) {
      setWallpaper("Day");
    }else{
        setbackgroundColor("rgba(8, 21, 26, 0.662)")
        setbackgroundColor2("rgba(1, 10, 12, 0.731)")
    }
    
  }, []);


  useEffect(() => {
    if(apiData.length !== 0){
        setBackground();
    }
  },[ref.current])

  function setBackground() {
   
    if (wallpaper === "Day") {
        setMywallpaper(
          dayWallpaper.filter((ele) => {
            return (ele.toLowerCase()).includes(ref.current.toLowerCase());
          })
        );
      } else {
        setMywallpaper(
          nightWallpaper.filter((ele) => {
            console.log(ref.current);
            return (ele.toLowerCase()).includes(ref.current.toLowerCase());
          })
        );
      }
   
  }

  return (
    <div
      style={{ backgroundImage: `url(${myWallpaper})` }}
      className="mainContainer"
    >
      <h1 className="mainHeading">Weather App</h1>
      <div className="inputContainer">
        <input className="input" placeholder="SEARCH HERE"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
        />
        <button className="button"
          onClick={() => {
            apiCall(input, setApidata, ref);
          }}
        >
          Search
        </button>
      </div>
      <div style={{backgroundColor:backgroundColor}} className="innerContainer">
        <div style={{backgroundColor:backgroundColor2}} className="leftContainer">
          <div className="upperContainer">
            <p className="temp">
              {apiData.length !== 0
                ? (apiData.main.temp_max - 273.15).toFixed(0)
                : 0}
              &deg;C
            </p>
            <p className="weatherCondition">
              {apiData.length !== 0 ? apiData.weather[0].main : "ll||ll"}
            </p>
          </div>
          <hr style={{width:"90%"}} />
          <div className="lowerContainer">
            <div className="dataContainer">
              <i className="iconIcon fa-solid fa-wind wind_icon"></i>
              <p className="heading">Wind</p>
              <p className="data">{apiData.length !== 0 ? apiData.wind.speed + "kmph": temp}</p>
            </div>
            <div className="dataContainer">
              <img
                style={{ height: "20%", style: "color: rgb(116, 116, 245)" }}
                src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
                alt=""
              />
              <p className="heading">Humidity</p>
              <p className="data">{apiData.length !== 0 ? apiData.main.humidity + "%" : temp}</p>
            </div>
            <div className="dataContainer">
              <i className="iconIcon fa-solid fa-cloud wind_icon"></i>
              <p className="heading">Cloudiness</p>
              <p className="data">
                {apiData.length !== 0 ? apiData.weather[0].main + "%" : temp}
              </p>
            </div>
            <div className="dataContainer">
              <i className="iconIcon fa-solid fa-temperature-three-quarters wind_icon"></i>
              <p className="heading">Pressure</p>
              <p className="data">
                {apiData.length !== 0 ? apiData.main.pressure + "hPa" : temp}
              </p>
            </div>
            <div className="dataContainer">
              <i className="iconIcon fa-solid fa-eye wind_icon"></i>
              <p className="heading">Visibility</p>
              <p className="data">
                {apiData.length !== 0 ? apiData.visibility / 1000 + "km" : temp}
              </p>
            </div>
          </div>
        </div>
        <div className="rightContainerr">
          <RightContainer apiData={apiData} />
        </div>
      </div>
    </div>
  );
};

export default Container;
