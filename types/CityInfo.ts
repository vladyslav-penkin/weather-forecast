export interface CityInfo {
  id: number;
  dt_txt: string;
  weatherId: number;
  name: string;
  coord: {
      lat: number;
      lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
  temp: number;
}