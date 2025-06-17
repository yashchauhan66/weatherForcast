import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const API_KEY = 'be1089e27a204c44a62151156251606';
    const BASE_URL = 'https://api.weatherapi.com/v1';

    const fetchWeather = async (cityName) => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${cityName}&aqi=no`);
            setWeather(response.data);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('City not found. Please try again.');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
        }
    };

    const getWeatherIcon = (condition) => {
        const iconMap = {
            'Sunny': '☀️',
            'Partly cloudy': '⛅',
            'Cloudy': '☁️',
            'Rain': '🌧️',
            'Thunder': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️'
        };
        return iconMap[condition] || '🌡️';
    };

    return (
        <div className="home-container">
            <div className="search-section">
                <h1>Weather Forecast</h1>
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name..."
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </div>

            {loading && (
                <div className="loading">
                    <div className="loader"></div>
                    <p>Loading weather data...</p>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            {weather && (
                <div className="weather-cards">
                    <div className="weather-card main">
                        <div className="card-header">
                            <h2>{weather.location.name}</h2>
                            <p className="region">{weather.location.region}, {weather.location.country}</p>
                        </div>
                        <div className="card-body">
                            <div className="temperature">
                                <span className="temp">{weather.current.temp_c}°C</span>
                                <span className="feels-like">Feels like: {weather.current.feelslike_c}°C</span>
                            </div>
                            <div className="weather-condition">
                                <span className="icon">{getWeatherIcon(weather.current.condition.text)}</span>
                                <span className="condition">{weather.current.condition.text}</span>
                            </div>
                        </div>
                    </div>

                    <div className="weather-details">
                        <div className="detail-card">
                            <h3>Humidity</h3>
                            <p>{weather.current.humidity}%</p>
                        </div>
                        <div className="detail-card">
                            <h3>Wind Speed</h3>
                            <p>{weather.current.wind_kph} km/h</p>
                        </div>
                        <div className="detail-card">
                            <h3>Pressure</h3>
                            <p>{weather.current.pressure_mb} mb</p>
                        </div>
                        <div className="detail-card">
                            <h3>UV Index</h3>
                            <p>{weather.current.uv}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
