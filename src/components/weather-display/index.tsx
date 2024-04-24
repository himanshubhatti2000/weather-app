import "./style.css";
import { WeatherData } from "../../types";

interface WeatherDisplayProps {
  weather: WeatherData;
}

function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div className="weather-container">
      <img
        src={weather.current.condition.icon}
        alt="Weather Icon"
        className="weather-ico"
      />
      <h1 className="weather-header">
        {weather.location.name}, {weather.location.region}
      </h1>
      <p className="weather-detail">
        Temperature:{" "}
        <span>
          {weather.current.temp_c} °C / {weather.current.temp_f} °F
        </span>
      </p>
      <p className="weather-detail">
        Condition: <span>{weather.current.condition.text}</span>
      </p>
      <p className="weather-detail">
        Wind:{" "}
        <span>
          {weather.current.wind_kph} kph / {weather.current.wind_mph} mph
        </span>
      </p>
      <p className="weather-detail">
        Humidity: <span>{weather.current.humidity}%</span>
      </p>
    </div>
  );
}

export default WeatherDisplay;
