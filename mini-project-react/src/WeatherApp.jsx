import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";


export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo] = useState({
        city: "Delhi",
        feelsLike: 31.4,
        humidity: 62,
        temp: 29.03,
      tempMax: 29.03,
      tempMin: 29.03,
      weather: "moderate rain",
    });

    let updateInfo = (newInfo)=>{
      setWeatherInfo(newInfo);
    }


    return(
        <div style={{textAlign:"center"}}>
            <h2 style={{color: "#f9d423",textShadow:"0 2px 6px rgba(0, 0, 0, 0.25)"}}>Weather App</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info = {weatherInfo}/>
        </div>
    )
}