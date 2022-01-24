import { useEffect, useState, map } from "react";
import { WeatherDay } from "../WeatherDay/WeatherDay";
import styles from './styles.module.css';

export const App = () => {

  const locationKey = '35009_PC';
  const APIKey = 'ARqgk0TweLURdTeWGG3cTnJ0jIXRtTNu';

  const [weatherInfo, setWeatherInfo] = useState();

  // add 0 to single num for photo. Takes in number->converts to string-> measures len-> Compare len ==1
  const padNum = (num) =>{
    const stringNum = num+'';
    const stringLen = stringNum.length;

    if (stringLen ===1){
      return '0' + stringNum //4->04
    }
    else{
      return stringNum
    }
  };

    useEffect(() => {
    fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${APIKey}`
    )
    .then(data => data.json())
    .then(data=> setWeatherInfo(data.DailyForecasts.map(forecasts => {
      return {
        min: forecasts.Temperature.Minimum.Value,
        max: forecasts.Temperature.Maximum.Value,
        weatherType: forecasts.Day.IconPhrase,
        iconNum: padNum(forecasts.Day.Icon)
      }
    }
      )));
  },[]);

  //  useEffect(() => {
  //       fetch(
  //         `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${APIKey}`
  //       )
  //       .then(data => data.json())
  //       .then(data=> console.log(data));
  //     },[]);

  //updates for whenever the Weather Info changes
  // useEffect(()=>{
  //   console.log(weatherInfo)
  // },[weatherInfo]);

  return (
    <div className={styles.main}>
      {!!weatherInfo && weatherInfo.map((i,index) =>(
      <div key = {index} className={styles.day}>
        <WeatherDay 
        min = {i.min} 
        max = {i.max} 
        weatherType={i.weatherType} 
        iconNum = {i.iconNum}>
        </WeatherDay> 
      
        </div>
      ))}
    </div>  
  );
}

