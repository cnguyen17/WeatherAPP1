import { useState } from "react";

export const LocationSearch=() =>{

    const[zipcode,setZipCode] = useState('');
    const getLocation = () => {

    }

    
    return(
        <div>   
            <input
            value={zipcode}
            onchange = {e=>setZipCode(e.target.value)}
            />
        <button onClick={getLocation}>Search</button>
        </div>
    );
};