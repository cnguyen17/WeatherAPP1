// Takes in parameter of min, max, and weather type, so that this hook can be used in the main app from the API Call

export const WeatherDay = ({min,max, weatherType,iconNum}) =>{
    return(
        <>
                    
            <img 
                alt ={weatherType}
                src = {`https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`}
            />    
            <div>Min Temp: {min} Max Temp: {max} </div>
        </>

    );

};
