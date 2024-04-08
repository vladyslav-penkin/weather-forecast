export interface SearchForecastListItem {
  id: number,
  name: string,
  coord: {
    lat: number,
    lon: number,
  },
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
   },
  dt: number,
  wind: {
    speed: number,
    deg: number,
  },
  sys: {
    country: string,
  },
  rain: {
    "1h": number
  } | null,
   snow: {
    "1h": number
   } | null,
  clouds: {
    all: number,
  },
  weather: Array<{
    id: number,
    main: string,
    description: string,
    icon: string,
  }>
};