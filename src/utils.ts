import {  WeatherData } from "./types";

export const fetchWeather = async (city: string): Promise<WeatherData | null> => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const api = import.meta.env.VITE_WEATHER_API;
    const url = `${api}/current.json?key=${apiKey}&q=${city}&aqi=no`;
  
    try {
        const response = await fetch(url);
        const data = (await response.json()) as WeatherData;
        if (data.error) {
          throw new Error(`Error ${data.error.code}: ${data.error.message}`);
        }
        return data;
      } catch (error: unknown) { 
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      }
  };