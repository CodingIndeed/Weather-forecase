import React from 'react';

const ForecastItem = ({ date, temp, description }) => {
  return (
    <div className="forecast-item">
      <p>{date}</p>
      <p>{temp}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default ForecastItem;
