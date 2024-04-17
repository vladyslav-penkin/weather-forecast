import axios from 'axios';
import { Forecast } from '../types/Forecast';
import { SearchForecast } from '../types/SearchForecast';

export const BASE_URL = 'https://api.openweathermap.org';
export const FORECAST_ENDPOINT = 'forecast';
export const SEARCH_ENDPOINT = 'find';
export const openWeatherKey = '4456c4a501dce63e96047f5bf8d288a2';
export const UNITS_METRIC = 'metric';
export const UNITS_IMPERIAL = 'imperial';

export const getWeatherSearchList = async (cityName: string, lang: string): Promise<SearchForecast> => {
  const queryParams = [];
  if (lang) queryParams.push(`lang=${lang}`);

  const { data } = await axios.get(`${BASE_URL}/data/2.5/${SEARCH_ENDPOINT}?q=${cityName}${
    queryParams.length ? `&${queryParams.join('&')}` : ''
  }&appid=${openWeatherKey}&units=metric`);
  return data;
};

export const getWeatherData = async (cityId: number, lang: string, units: string, lat?: number, lon?: number, cnt?: string): Promise<Forecast> => {
  const queryParams = [];
  if (lat !== undefined) queryParams.push(`lat=${lat}`);
  if (lon !== undefined) queryParams.push(`lon=${lon}`);
  if (cnt) queryParams.push(`cnt=${cnt}`);
  if (lang) queryParams.push(`lang=${lang}`);

  const path = `${BASE_URL}/data/2.5/${FORECAST_ENDPOINT}?id=${cityId}${
    queryParams.length ? `&${queryParams.join('&')}` : ''
  }&appid=${openWeatherKey}&units=${units}`;

  const { data } = await axios.get(path);
  return data;
};
