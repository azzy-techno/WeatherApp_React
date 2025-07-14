import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [cityName, setCityName] = useState("");

  const fetchWeather = async (location) => {
    try {
      const apiKey = "BBFZBG36YE92X57A8K5UZ98G4";
      const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;

      console.log("🔄 Fetching Weather API:", apiUrl);

      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Invalid location or server error");

      const data = await res.json();
      console.log("✅ Weather API Response:", data);

      setWeatherData({
        the_temp: data.currentConditions.temp,
        weather_state_name: data.currentConditions.conditions,
      });

      setCityName(data.resolvedAddress || location);

      const forecastData = data.days.slice(1, 6).map(day => ({
        applicable_date: day.datetime,
        the_temp: day.temp,
        humidity: day.humidity,
      }));

      setForecast(forecastData);
    } catch (error) {
      console.error("❌ Failed to fetch weather data:", error);
      alert("Please enter a valid city name.");
    }
  };

  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && conn.effectiveType) {
      console.log("📶 Network Type:", conn.effectiveType);
      setIsSlowConnection(conn.effectiveType.includes("2g") || conn.saveData);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log("✅ Geolocation Success:", pos.coords);
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetchWeather(`${lat},${lon}`);
      setCityName("Current Location");
    }, (err) => {
      console.error("❌ Geolocation Error:", err.message);
    });
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData, forecast, isSlowConnection, fetchWeather, cityName }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;