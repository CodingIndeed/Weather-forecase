import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle between light and dark mode
  const [showModal, setShowModal] = useState(false); // State to show/hide modal

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setForecastData(forecastResponse.data);
      setError('');
    } catch (err) {
      setError('City not found, please try again.');
      setWeatherData(null);
      setForecastData(null);
    }
    setLoading(false);
  };

  const fetchWeatherByLocation = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setForecastData(forecastResponse.data);
      setError('');
    } catch (err) {
      setError('Unable to fetch weather data for your location.');
      setWeatherData(null);
      setForecastData(null);
    }
    setLoading(false);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherByLocation(position.coords.latitude, position.coords.longitude);
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather();
    }
  };

  // Function to toggle between light and dark mode
  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Function to show/hide modal with PM Accelerator info
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to format Unix timestamps to "hh:mm AM/PM" considering the timezone offset
  const formatTime = (unixTime, timezoneOffset) => {
    const date = new Date((unixTime + timezoneOffset) * 1000);  // Adjust for the timezone offset
    return date.toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="header-container big-container">
        <h1 className="title">Weather Forecast</h1>
        <button onClick={getLocation} className="location-button">
          Get Weather for My Location
        </button>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="input"
          />
          <button type="submit" className="button">
            Get Weather
          </button>
        </form>
        <div className="info-button-container">
          {/* Switched the placement of info and toggle mode buttons */}
          <button onClick={toggleModal} className={`info-button ${isDarkMode ? 'dark-info' : 'light-info'}`}>
            Info
          </button>

          {/* Toggle switch for dark/light mode */}
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleMode} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="big-container">
          <div className="weather-info">
            <h2 className="city-name">{weatherData.name}</h2>
            <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
            <p className="weather-description">{weatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="weather-icon"
            />
            <p className="feels-like">Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
            <p className="visibility">Visibility: {Math.round(weatherData.visibility / 1000)} km</p>
            <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
            <p className="wind">Wind Speed: {weatherData.wind.speed} m/s</p>
            <div className="temp-range">
              <p className="low-temp">Low: {Math.round(weatherData.main.temp_min)}°C</p>
              <p className="high-temp">High: {Math.round(weatherData.main.temp_max)}°C</p>
            </div>
            <div className="sun-info">
              <p>
                Sunrise: {formatTime(weatherData.sys.sunrise, weatherData.timezone)} / 
                Sunset: {formatTime(weatherData.sys.sunset, weatherData.timezone)} (UTC{weatherData.timezone / 3600})
              </p>
            </div>
          </div>
        </div>
      )}

      {forecastData && (
        <div className="forecast-container big-container">
          <h3>5-Day Forecast</h3>
          <div className="forecast-grid">
            {forecastData.list.slice(0, 5).map((item, index) => (
              <div key={index} className="forecast-item">
                <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                <p>{Math.round(item.main.temp)}°C</p>
                <p>{item.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Forecast weather icon"
                  className="forecast-icon"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer with your name */}
      <footer className={isDarkMode ? 'dark-footer' : 'light-footer'}>
        <p>Developed by Mathew Mathew</p>
      </footer>

      {/* Modal for PM Accelerator info */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2>PM Accelerator</h2>
            <p>
              Hiring and getting hired for product management roles is hard.<br />
              In the short timeframe of an interview, it is difficult to precisely assess<br />
              and display the necessary, complex skills.<br />
              Product Managers play key roles in a company.<br />
              Hiring for those positions shouldn’t be a guessing game.
            </p>
            <p>
              It is our vision to make it simple and beneficial for Product Managers<br />
              to accurately display their skills and empower hiring companies<br />
              to choose the right Product Manager every time.
            </p>
            <p>
              Sign up now: <a href="https://pm-accelerator.webflow.io/" target="_blank" rel="noopener noreferrer">https://pm-accelerator.webflow.io/</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
