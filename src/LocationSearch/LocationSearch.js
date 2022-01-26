import React, { useState } from "react";
import { APIKey } from "../Constants";
import styles from './styles.module.css';


export const LocationSearch=({onCityFound}) =>{

    // establish variable constant zipCode, and update constant when zipcode updates in search bar
    const[zipCode, setZipCode] = useState();

    // get called everytime the button gets clicked
    const getLocation = (zip) => {
        console.log(zip);
        const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${APIKey}&q=${zip}&language=en-us`
        fetch(url)
        .then(data => data.json())
        //Searches the JSON fetch file (Location) to make sure filter out US Zipcodes
        .then(data =>data.find(location=>location.Country.ID === 'US'))
        // .then(data=>console.log(data));
        .then(data=>{
            onCityFound({
                name: data.LocalizedName,
                loc_id: data.Key,
                state: data.AdministrativeArea.ID,
            });
            setZipCode ('')
        });

    };

    
    return(
        <div className= {styles.main}>   
            <input
            placeholder = 'Zip Code'
            // type = "text"
            value= {zipCode}
            onChange = {e=>setZipCode(e.target.value)}
            />
        <button onClick={()=> getLocation(zipCode)}>Search</button>
        </div>
    );
};