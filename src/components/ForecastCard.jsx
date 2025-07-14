import React, { useEffect, useRef, useState } from 'react';

const ForecastCard = ({ data, slow }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("👀 Forecast Card Visible:", entry.target);
          setVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`forecast-card ${visible ? 'visible' : 'placeholder'}`}
    >
      {visible ? (
        <>
          <p className="day">{new Date(data.applicable_date).toLocaleDateString()}</p>
          <p className="temperature">🌡️ {data.the_temp.toFixed(1)}°C</p>
          {!slow && <p>💧 {data.humidity}% humidity</p>}
        </>
      ) : (
        <p>⌛ Loading...</p>
      )}
    </div>
  );
};

export default ForecastCard;