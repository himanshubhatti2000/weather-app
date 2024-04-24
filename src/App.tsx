import "./App.css";
import "./index.css";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchWeather } from "./utils";
import { WeatherData } from "./types";
import { suggestions } from "./data";
import SearchBar from "./components/search-bar";
import WeatherDisplay from "./components/weather-display";
import Loading from "./components/loading";
import Card from "./components/card";
import Error from "./components/error";
import Logo from "./components/logo";
import PlaceSuggestion from "./components/place-suggestions";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  /* Handling search action, using callback to avoid unnecessary function creation on re rendering */
  const handleSearchCallback = useCallback(async (city: string) => {
    setIsSearching(true);
    setError(null);
    setWeather(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
      setError((error as Error).message || "Something went wrong!");
    } finally {
      setIsSearching(false);
    }
  }, []);

  /* Handling search on changing search query */
  useEffect(() => {
    if (searchQuery) {
      handleSearchCallback(searchQuery);
    }
  }, [searchQuery, handleSearchCallback]);

  /* Updating search query from url search params */
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
          <>
            {suggestions.map((place) => (
              <PlaceSuggestion key={place} text={place} />
            ))}
          </>
        )}
        <div className="content-container">
          {isSearching && <Loading />}
          {error && <Error text={error} />}
          {weather && !isSearching && <WeatherDisplay weather={weather} />}
        </div>
      </Card>
    </div>
  );
}

export default App;
