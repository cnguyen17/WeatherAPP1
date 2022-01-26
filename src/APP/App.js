import { useEffect, useState, map } from "react";
import { WeatherDay } from "../WeatherDay/WeatherDay";
import styles from './styles.module.css';
import { APIKey } from "../Constants";
import { LocationSearch } from "../LocationSearch/LocationSearch";

export const App = () => {

  // const locationKey = '35009_PC';
  // const APIKey = 'ARqgk0TweLURdTeWGG3cTnJ0jIXRtTNu';

  const [locationKey, setlocationKey] = useState();
  const [weatherInfo, setWeatherInfo] = useState();
  const [location, setLocation] = useState();


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
      // threw an error because locationKey doesn't exist, so only run when locaiton key exists
      console.log(locationKey)
      if(locationKey){
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
      }
  },[locationKey]);

  //whenver ^(locationkey) changes, 

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
    <div>

      <LocationSearch
        // recieving object form locationSearch into the cityInfo variable and logging it to test.
        onCityFound={cityInfo=> {
          console.log('Found: ',cityInfo)
          setlocationKey(cityInfo.loc_id)
          setLocation(cityInfo.name + ', ' + cityInfo.state)
        }}
      />
<h1 className={styles.header}>{location}</h1>
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
    </div>
  );

    
}

