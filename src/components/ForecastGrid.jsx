import React, { useContext } from 'react';
import { WeatherContext } from './WeatherProvider';
import ForecastCard from './ForecastCard';

const ForecastGrid = () => {
  const { forecast, isSlowConnection } = useContext(WeatherContext);

  if (!forecast.length) return <p>Loading forecast...</p>;

  return (
    <>
      <p className="intersection-info">
        🕵️ Forecast cards below load only when they scroll into view — using <strong>Intersection Observer API</strong>.<br />
        🧭 <em>Scroll down ⬇️ to load each card.</em>
      </p>
      <div className="forecast-grid column-view">
        {forecast.map((day, index) => (
          <ForecastCard key={index} data={day} slow={isSlowConnection} />
        ))}
      </div>
    </>
  );
};

export default ForecastGrid;