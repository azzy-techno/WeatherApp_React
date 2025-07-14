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
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!visible) return <div ref={ref} className="forecast-card placeholder" />;

  return (
    <div ref={ref} className="forecast-card">
      <p>{new Date(data.applicable_date).toLocaleDateString()}</p>
      <p>🌡️ {data.the_temp.toFixed(1)}°C</p>
      {!slow && <p>💧 {data.humidity}% humidity</p>}
    </div>
  );
};

export default ForecastCard;