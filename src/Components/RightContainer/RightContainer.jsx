import React, { useEffect, useState } from 'react'
import "./RightContainer.css";
import Clear_night_icon from "../../Images/Clear_night_icon.jpg"
import Clean_day from "../../Images/Clear.png"
import Cloudy_night from "../../Images/Clouds_night.png"
import Morning_cloudy from "../../Images/Clouds.jpg"
import Fog from "../../Images/Fog_logo.png"
import Haze_Night from "../../Images/Haze_night_logo.png" 
import Haze_day from "../../Images/Haze.png" 
import Mist from "../../Images/Mist.png" 
import Rainy_day from "../../Images/rainy_day_logo.png" 
import Rainy_night from "../../Images/Rainy_night_logo.png"
import Smoky_night from "../../Images/smoke_night_logo.png"
import Smoky_day from "../../Images/Smoke.png"
import Snow_night from "../../Images/Snow_night_logo.webp"
import Snow_day from "../../Images/Snow.png"
import Sunny from "../../Images/Sunny.png"


const RightContainer = ({apiData}) => {
  const [date,setDate] = useState(new Date());
  const [icon,setIcon] = useState();
  const [dayIconArr,setIconarr] = useState([Clean_day,Morning_cloudy,Fog,Haze_day,Mist,Rainy_day,Smoky_day,Snow_day,Sunny])
  const [nightIconArr,setnightIconarr] = useState([Clear_night_icon,Cloudy_night,Fog,Haze_Night,Mist,Rainy_day,Rainy_night,Smoky_night,Snow_night,Sunny])
  let time = date.getHours();
  
  useEffect(() => {

    if(time>=5 && time<=17){
      setIcon("Day")
    }
  },[])
  return (
    <div className='rightInnerContainer'>
        <p className="date">Date : {new Date().toUTCString().slice(5, 16)}</p>
        <p className="city">City</p>
        <h2 id="city">{apiData.length !== 0 ? apiData.name + "   " + apiData.sys.country : ""}</h2>
        {apiData.length !==0 && <img id="weather_logo" src={icon === "Day" ? dayIconArr.filter((ele) => {

          return ele.toLowerCase().includes((apiData.weather[0].main).toLowerCase())
          // apiData.weather[0].main
        }) : nightIconArr.filter((ele) => {
          return ele.toLowerCase().includes((apiData.weather[0].main).toLowerCase())
        })} alt=""/>}
    </div>
  )
}

export default RightContainer