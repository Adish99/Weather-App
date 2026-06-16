import { FiWind } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export const WeatherApp=()=>{
    const [weatherData,setWeatherData]=useState({});
    const [searchInput,setSearchInput]=useState("kathmandu");
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(null);

    //Weather images
    const weatherIcons = {
    Clear: "/images/clear.png",
    Clouds: "/images/clouds.png",
    Rain: "/images/rain.png",
    Drizzle: "/images/drizzle.png",
    Mist: "/images/mist.png",
    Fog: "/images/mist.png",
    Haze: "/images/mist.png",
    Snow: "/images/snow.png",
    Thunderstorm: "/images/thunderstorm.png",
};

const condition=weatherData?.weather?.[0]?.main;



    const getWeatherApi=async(city)=>{
        setError(null);
        setIsLoading(true);
        try{
            const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`);
           const data=await res.json();
           if(data.cod==="404"){
            alert("City not found!");
            setIsLoading(false)
            return;
           }
            console.log(data);
            setWeatherData(data);
            setIsLoading(false);
        }catch(error){
            console.log(error);
            setIsLoading(false);
            setError(error);
        }
    }

    const handleSearch=()=>{
        if(!searchInput.trim()){
           alert("Please Enter city name!");
           setSearchInput("");
           return;
        }
getWeatherApi(searchInput);
    }

useEffect(()=>{
getWeatherApi(searchInput);
},[]);



const {name,main,wind}=weatherData;
    return(
        <>
        {isLoading &&(
            <h1 className="loading">Loading...</h1>
        )}
        {error && (
            <h1 className="error">Error:{error.message}</h1>
        )}
        <section className="weather-container">
             {/*Search bar */}
          <div className="search-box">
            <input type="text" placeholder="Search City" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} autoComplete="off"/>
            <button type="submit" onClick={()=>handleSearch()}><i><FaSearch/></i></button>
          </div>
          {/*Weather condition Image*/}
          <div className="weather-icon">
            <img 
            src={weatherIcons[condition] || "/images/clear.png"}
            alt={condition}
            />
          </div>
          {/*Temperature*/}
         <div>
            <p className="temperature">{main?.temp? Math.floor(main.temp-273.15):"--"}.C</p>
            <p className="city">{name}</p>
         </div>

         {/*Weather other details box */}
         <section className="weather-details">
            <div className="detail-box">
              <img src="/images/humidity.png" alt="humidity" />
               <h4>{main?.humidity?main.humidity:"--"}%</h4>
                <p>Humidity</p>
            </div>
            <div className="detail-info">
            <h4><i><FiWind /></i>
            {wind?.speed?wind.speed:"--"}km/hr</h4>
            <p>wind speed</p>
            </div>
         </section>
        </section>
        <footer className="footer">
    <p>
        © {new Date().getFullYear()} <span>Adish</span> • Weather App
    </p>
</footer>
        </>
    )
}