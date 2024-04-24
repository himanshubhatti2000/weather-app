import "./App.css";
import "./index.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./components/search-bar";
import WeatherDisplay from "./components/weather-display";
import { WeatherData } from "./types";
import Loading from "./components/loading";
import Card from "./components/card";
import Error from "./components/error";
import Logo from "./components/logo";
import PlaceSuggestion from "./components/place-suggestions";

const suggestions = ["Mandi, Himachal Pradesh", "Chandigarh", "London"];

type ErrorType = string | { message?: string; code?: number } | null;

function errorMessage(error: ErrorType) {
  let errorMessage = "Something went wrong!";

  if (typeof error === "object" && error !== null && error.message) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return errorMessage;
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);
  const location = useLocation();

  const fetchWeather = async (city: string) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      setIsSearching(true);
      setError(null);
      setWeather(null);
      const response = await fetch(url);
      const data = (await response?.json()) as WeatherData;
      console.log(data);
      if (!data?.error) {
        setWeather(data);
      } else {
        setError(data?.error);
      }
    } catch (error) {
      console.error("Failed to fetch weather", error);
      setError(error ?? "Something went wrong!");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchWeather(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");

    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  }, [location.search]);

  return (
    <div>
      <Card className="app-container">
        <div className="logo-container">
          <Logo />
        </div>
        <SearchBar searchQuery={searchQuery} isSearching={isSearching} />
        {!error && !weather && !isSearching && !searchQuery && (
          <div>
            {suggestions.map((place) => (
              <PlaceSuggestion key={place} text={place} />
            ))}
          </div>
        )}
        <div className="content-container">
          {isSearching && <Loading />}
          {error && <Error text={errorMessage(error)} />}
          {weather && !isSearching && <WeatherDisplay weather={weather} />}
        </div>
      </Card>
    </div>
  );
}

export default App;
