import axios from 'axios';
import { Forecast } from '../types/Forecast';
import { SearchForecast } from '../types/SearchForecast';

export const BASE_URL = 'https://api.openweathermap.org';
export const FORECAST_ENDPOINT = 'forecast';
export const SEARCH_ENDPOINT = 'find';
export const openWeatherKey = '4456c4a501dce63e96047f5bf8d288a2';

export const getWeatherSearchList = async (cityName: string, lang: string): Promise<SearchForecast> => {
  const queryParams = [];
  if (lang) queryParams.push(`lang=${lang}`);

  const { data } = await axios.get(`${BASE_URL}/data/2.5/${SEARCH_ENDPOINT}?q=${cityName}${
    queryParams.length ? `&${queryParams.join('&')}` : ''
  }&appid=${openWeatherKey}&units=metric`);
  return data;
};

export const getWeatherData = async (cityId: number, lang: string, units: boolean, cnt?: string,): Promise<Forecast> => {
  const queryParams = [];
  if (cnt) queryParams.push(`cnt=${cnt}`);
  if (lang) queryParams.push(`lang=${lang}`);

  const path = `${BASE_URL}/data/2.5/${FORECAST_ENDPOINT}?id=${cityId}${
    queryParams.length ? `&${queryParams.join('&')}` : ''
  }&appid=${openWeatherKey}&units=${units ? 'imperial' : 'metric'}`;

  const { data } = await axios.get(path);
  return data;
};

export const searchData = {
    "message": "accurate",
    "cod": "200",
    "count": 5,
    "list": [
      {
        "id": 2643743,
        "name": "London",
        "coord": {
          "lat": 51.5085,
          "lon": -0.1257
        },
        "main": {
          "temp": 10.53,
          "feels_like": 9.6,
          "temp_min": 9.35,
          "temp_max": 11.54,
          "pressure": 1021,
          "humidity": 75
        },
        "dt": 1709741358,
        "wind": {
          "speed": 3.6,
          "deg": 90
        },
        "sys": {
          "country": "GB"
        },
        "rain": null,
        "snow": null,
        "clouds": {
          "all": 73
        },
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
          }
        ]
      },
      {
        "id": 6058560,
        "name": "London",
        "coord": {
          "lat": 42.9834,
          "lon": -81.233
        },
        "main": {
          "temp": 7.61,
          "feels_like": 6.2,
          "temp_min": 6.66,
          "temp_max": 9.25,
          "pressure": 1005,
          "humidity": 84
        },
        "dt": 1709741720,
        "wind": {
          "speed": 2.24,
          "deg": 23
        },
        "sys": {
          "country": "CA"
        },
        "rain": null,
        "snow": null,
        "clouds": {
          "all": 100
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ]
      },
      {
        "id": 4517009,
        "name": "London",
        "coord": {
          "lat": 39.8865,
          "lon": -83.4483
        },
        "main": {
          "temp": 8.83,
          "feels_like": 6.07,
          "temp_min": 6.41,
          "temp_max": 11.76,
          "pressure": 1014,
          "humidity": 93
        },
        "dt": 1709741383,
        "wind": {
          "speed": 5.14,
          "deg": 20
        },
        "sys": {
          "country": "US"
        },
        "rain": {
          "1h": 1
        },
        "snow": null,
        "clouds": {
          "all": 100
        },
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ]
      },
      {
        "id": 4298960,
        "name": "London",
        "coord": {
          "lat": 37.129,
          "lon": -84.0833
        },
        "main": {
          "temp": 12.93,
          "feels_like": 12.73,
          "temp_min": 12.66,
          "temp_max": 13.36,
          "pressure": 1011,
          "humidity": 94
        },
        "dt": 1709741379,
        "wind": {
          "speed": 2.06,
          "deg": 20
        },
        "sys": {
          "country": "US"
        },
        "rain": {
          "1h": 0.65
        },
        "snow": null,
        "clouds": {
          "all": 100
        },
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          },
          {
            "id": 701,
            "main": "Mist",
            "description": "mist",
            "icon": "50d"
          }
        ]
      },
      {
        "id": 5367815,
        "name": "London",
        "coord": {
          "lat": 36.4761,
          "lon": -119.4432
        },
        "main": {
          "temp": 9.51,
          "feels_like": 9.05,
          "temp_min": 7.88,
          "temp_max": 11.34,
          "pressure": 1013,
          "humidity": 83
        },
        "dt": 1709741705,
        "wind": {
          "speed": 1.54,
          "deg": 110
        },
        "sys": {
          "country": "US"
        },
        "rain": null,
        "snow": null,
        "clouds": {
          "all": 40
        },
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03d"
          }
        ]
      }
    ]
  };

export const data = {
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [{
      "dt": 1708581600,
      "main": {
          "temp": -1.5,
          "feels_like": -5.5,
          "temp_min": -3.1,
          "temp_max": -1.5,
          "pressure": 1013,
          "sea_level": 1013,
          "grnd_level": 891,
          "humidity": 70,
          "temp_kf": 1.6
      },
      "weather": [{
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
      }],
      "clouds": {
          "all": 8
      },
      "wind": {
          "speed": 3.22,
          "deg": 267,
          "gust": 4.94
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-22 06:00:00"
  }, {
      "dt": 1708592400,
      "main": {
          "temp": -2.15,
          "feels_like": -6.56,
          "temp_min": -3.45,
          "temp_max": -2.15,
          "pressure": 1014,
          "sea_level": 1014,
          "grnd_level": 892,
          "humidity": 74,
          "temp_kf": 1.3
      },
      "weather": [{
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
      }],
      "clouds": {
          "all": 27
      },
      "wind": {
          "speed": 3.54,
          "deg": 271,
          "gust": 6.83
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-22 09:00:00"
  }, {
      "dt": 1708603200,
      "main": {
          "temp": -3.21,
          "feels_like": -7.73,
          "temp_min": -4.06,
          "temp_max": -3.21,
          "pressure": 1016,
          "sea_level": 1016,
          "grnd_level": 893,
          "humidity": 78,
          "temp_kf": 0.85
      },
      "weather": [{
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
      }],
      "clouds": {
          "all": 31
      },
      "wind": {
          "speed": 3.4,
          "deg": 272,
          "gust": 6.55
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-22 12:00:00"
  }, {
      "dt": 1708614000,
      "main": {
          "temp": -4.04,
          "feels_like": -8.84,
          "temp_min": -4.04,
          "temp_max": -4.04,
          "pressure": 1019,
          "sea_level": 1019,
          "grnd_level": 893,
          "humidity": 82,
          "temp_kf": 0
      },
      "weather": [{
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 75
      },
      "wind": {
          "speed": 3.51,
          "deg": 269,
          "gust": 6.76
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-22 15:00:00"
  }, {
      "dt": 1708624800,
      "main": {
          "temp": 0.89,
          "feels_like": -2.47,
          "temp_min": 0.89,
          "temp_max": 0.89,
          "pressure": 1017,
          "sea_level": 1017,
          "grnd_level": 894,
          "humidity": 72,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 88
      },
      "wind": {
          "speed": 3.05,
          "deg": 267,
          "gust": 6.91
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-22 18:00:00"
  }, {
      "dt": 1708635600,
      "main": {
          "temp": 3.39,
          "feels_like": 1.37,
          "temp_min": 3.39,
          "temp_max": 3.39,
          "pressure": 1015,
          "sea_level": 1015,
          "grnd_level": 893,
          "humidity": 78,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 99
      },
      "wind": {
          "speed": 2.11,
          "deg": 259,
          "gust": 4.09
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-22 21:00:00"
  }, {
      "dt": 1708646400,
      "main": {
          "temp": 1.67,
          "feels_like": -1,
          "temp_min": 1.67,
          "temp_max": 1.67,
          "pressure": 1016,
          "sea_level": 1016,
          "grnd_level": 893,
          "humidity": 81,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 99
      },
      "wind": {
          "speed": 2.45,
          "deg": 274,
          "gust": 3.6
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-23 00:00:00"
  }, {
      "dt": 1708657200,
      "main": {
          "temp": -1.2,
          "feels_like": -5.29,
          "temp_min": -1.2,
          "temp_max": -1.2,
          "pressure": 1017,
          "sea_level": 1017,
          "grnd_level": 893,
          "humidity": 80,
          "temp_kf": 0
      },
      "weather": [{
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 64
      },
      "wind": {
          "speed": 3.4,
          "deg": 273,
          "gust": 6.04
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-23 03:00:00"
  }, {
      "dt": 1708668000,
      "main": {
          "temp": -2.42,
          "feels_like": -6.57,
          "temp_min": -2.42,
          "temp_max": -2.42,
          "pressure": 1018,
          "sea_level": 1018,
          "grnd_level": 893,
          "humidity": 81,
          "temp_kf": 0
      },
      "weather": [{
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
      }],
      "clouds": {
          "all": 34
      },
      "wind": {
          "speed": 3.17,
          "deg": 268,
          "gust": 5.43
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-23 06:00:00"
  }, {
      "dt": 1708678800,
      "main": {
          "temp": -3.38,
          "feels_like": -7.54,
          "temp_min": -3.38,
          "temp_max": -3.38,
          "pressure": 1018,
          "sea_level": 1018,
          "grnd_level": 893,
          "humidity": 83,
          "temp_kf": 0
      },
      "weather": [{
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
      }],
      "clouds": {
          "all": 6
      },
      "wind": {
          "speed": 2.98,
          "deg": 270,
          "gust": 5.15
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-23 09:00:00"
  }, {
      "dt": 1708689600,
      "main": {
          "temp": -3.85,
          "feels_like": -8.28,
          "temp_min": -3.85,
          "temp_max": -3.85,
          "pressure": 1017,
          "sea_level": 1017,
          "grnd_level": 892,
          "humidity": 82,
          "temp_kf": 0
      },
      "weather": [{
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
      }],
      "clouds": {
          "all": 8
      },
      "wind": {
          "speed": 3.16,
          "deg": 257,
          "gust": 5.06
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-23 12:00:00"
  }, {
      "dt": 1708700400,
      "main": {
          "temp": -4.28,
          "feels_like": -8.63,
          "temp_min": -4.28,
          "temp_max": -4.28,
          "pressure": 1016,
          "sea_level": 1016,
          "grnd_level": 891,
          "humidity": 83,
          "temp_kf": 0
      },
      "weather": [{
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
      }],
      "clouds": {
          "all": 9
      },
      "wind": {
          "speed": 2.99,
          "deg": 262,
          "gust": 4.88
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-23 15:00:00"
  }, {
      "dt": 1708711200,
      "main": {
          "temp": 1.05,
          "feels_like": -2.2,
          "temp_min": 1.05,
          "temp_max": 1.05,
          "pressure": 1013,
          "sea_level": 1013,
          "grnd_level": 891,
          "humidity": 65,
          "temp_kf": 0
      },
      "weather": [{
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
      }],
      "clouds": {
          "all": 8
      },
      "wind": {
          "speed": 2.95,
          "deg": 263,
          "gust": 5.84
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-23 18:00:00"
  }, {
      "dt": 1708722000,
      "main": {
          "temp": 4.2,
          "feels_like": 1.97,
          "temp_min": 4.2,
          "temp_max": 4.2,
          "pressure": 1009,
          "sea_level": 1009,
          "grnd_level": 888,
          "humidity": 63,
          "temp_kf": 0
      },
      "weather": [{
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
      }],
      "clouds": {
          "all": 5
      },
      "wind": {
          "speed": 2.48,
          "deg": 250,
          "gust": 4.74
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-23 21:00:00"
  }, {
      "dt": 1708732800,
      "main": {
          "temp": 2.64,
          "feels_like": -0.53,
          "temp_min": 2.64,
          "temp_max": 2.64,
          "pressure": 1006,
          "sea_level": 1006,
          "grnd_level": 885,
          "humidity": 69,
          "temp_kf": 0
      },
      "weather": [{
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
      }],
      "clouds": {
          "all": 13
      },
      "wind": {
          "speed": 3.26,
          "deg": 262,
          "gust": 6.07
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-24 00:00:00"
  }, {
      "dt": 1708743600,
      "main": {
          "temp": 1.21,
          "feels_like": -2.81,
          "temp_min": 1.21,
          "temp_max": 1.21,
          "pressure": 1006,
          "sea_level": 1006,
          "grnd_level": 885,
          "humidity": 65,
          "temp_kf": 0
      },
      "weather": [{
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 69
      },
      "wind": {
          "speed": 4.02,
          "deg": 260,
          "gust": 9.69
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-24 03:00:00"
  }, {
      "dt": 1708754400,
      "main": {
          "temp": -0.05,
          "feels_like": -3.28,
          "temp_min": -0.05,
          "temp_max": -0.05,
          "pressure": 1006,
          "sea_level": 1006,
          "grnd_level": 884,
          "humidity": 69,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 85
      },
      "wind": {
          "speed": 2.7,
          "deg": 300,
          "gust": 6.1
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-24 06:00:00"
  }, {
      "dt": 1708765200,
      "main": {
          "temp": -0.74,
          "feels_like": -4.34,
          "temp_min": -0.74,
          "temp_max": -0.74,
          "pressure": 1006,
          "sea_level": 1006,
          "grnd_level": 884,
          "humidity": 69,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 93
      },
      "wind": {
          "speed": 2.95,
          "deg": 264,
          "gust": 5.98
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-24 09:00:00"
  }, {
      "dt": 1708776000,
      "main": {
          "temp": -4.02,
          "feels_like": -10.02,
          "temp_min": -4.02,
          "temp_max": -4.02,
          "pressure": 1012,
          "sea_level": 1012,
          "grnd_level": 887,
          "humidity": 82,
          "temp_kf": 0
      },
      "weather": [{
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 69
      },
      "wind": {
          "speed": 5.11,
          "deg": 352,
          "gust": 11
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-24 12:00:00"
  }, {
      "dt": 1708786800,
      "main": {
          "temp": -4.28,
          "feels_like": -9.22,
          "temp_min": -4.28,
          "temp_max": -4.28,
          "pressure": 1012,
          "sea_level": 1012,
          "grnd_level": 888,
          "humidity": 74,
          "temp_kf": 0
      },
      "weather": [{
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 61
      },
      "wind": {
          "speed": 3.61,
          "deg": 342,
          "gust": 8.11
      },
      "visibility": 10000,
      "pop": 0.01,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-24 15:00:00"
  }, {
      "dt": 1708797600,
      "main": {
          "temp": -3.42,
          "feels_like": -8.38,
          "temp_min": -3.42,
          "temp_max": -3.42,
          "pressure": 1013,
          "sea_level": 1013,
          "grnd_level": 888,
          "humidity": 67,
          "temp_kf": 0
      },
      "weather": [{
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 81
      },
      "wind": {
          "speed": 3.87,
          "deg": 350,
          "gust": 5.7
      },
      "visibility": 10000,
      "pop": 0.01,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-24 18:00:00"
  }, {
      "dt": 1708808400,
      "main": {
          "temp": -2.79,
          "feels_like": -4.85,
          "temp_min": -2.79,
          "temp_max": -2.79,
          "pressure": 1011,
          "sea_level": 1011,
          "grnd_level": 887,
          "humidity": 66,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 1.45,
          "deg": 44,
          "gust": 2.06
      },
      "visibility": 10000,
      "pop": 0.22,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-24 21:00:00"
  }, {
      "dt": 1708819200,
      "main": {
          "temp": -2.83,
          "feels_like": -6.21,
          "temp_min": -2.83,
          "temp_max": -2.83,
          "pressure": 1009,
          "sea_level": 1009,
          "grnd_level": 885,
          "humidity": 64,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 2.36,
          "deg": 118,
          "gust": 2.63
      },
      "visibility": 10000,
      "pop": 0.14,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-25 00:00:00"
  }, {
      "dt": 1708830000,
      "main": {
          "temp": -4.14,
          "feels_like": -8.2,
          "temp_min": -4.14,
          "temp_max": -4.14,
          "pressure": 1009,
          "sea_level": 1009,
          "grnd_level": 885,
          "humidity": 77,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 2.74,
          "deg": 138,
          "gust": 4.75
      },
      "visibility": 10000,
      "pop": 0.11,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-25 03:00:00"
  }, {
      "dt": 1708840800,
      "main": {
          "temp": -5,
          "feels_like": -9.79,
          "temp_min": -5,
          "temp_max": -5,
          "pressure": 1008,
          "sea_level": 1008,
          "grnd_level": 884,
          "humidity": 90,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 3.28,
          "deg": 150,
          "gust": 6.18
      },
      "visibility": 6100,
      "pop": 0.08,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-25 06:00:00"
  }, {
      "dt": 1708851600,
      "main": {
          "temp": -5.5,
          "feels_like": -10.26,
          "temp_min": -5.5,
          "temp_max": -5.5,
          "pressure": 1007,
          "sea_level": 1007,
          "grnd_level": 883,
          "humidity": 94,
          "temp_kf": 0
      },
      "weather": [{
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13n"
      }],
      "clouds": {
          "all": 99
      },
      "wind": {
          "speed": 3.15,
          "deg": 139,
          "gust": 6.91
      },
      "visibility": 621,
      "pop": 0.2,
      "snow": {
          "3h": 0.12
      },
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-25 09:00:00"
  }, {
      "dt": 1708862400,
      "main": {
          "temp": -6.22,
          "feels_like": -10.57,
          "temp_min": -6.22,
          "temp_max": -6.22,
          "pressure": 1006,
          "sea_level": 1006,
          "grnd_level": 881,
          "humidity": 95,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 99
      },
      "wind": {
          "speed": 2.65,
          "deg": 146,
          "gust": 5.79
      },
      "visibility": 2093,
      "pop": 0,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-25 12:00:00"
  }, {
      "dt": 1708873200,
      "main": {
          "temp": -6.49,
          "feels_like": -9.92,
          "temp_min": -6.49,
          "temp_max": -6.49,
          "pressure": 1005,
          "sea_level": 1005,
          "grnd_level": 880,
          "humidity": 96,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 1.94,
          "deg": 129,
          "gust": 3.53
      },
      "visibility": 2006,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-25 15:00:00"
  }, {
      "dt": 1708884000,
      "main": {
          "temp": -3.92,
          "feels_like": -8.13,
          "temp_min": -3.92,
          "temp_max": -3.92,
          "pressure": 1001,
          "sea_level": 1001,
          "grnd_level": 878,
          "humidity": 84,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 2.92,
          "deg": 155,
          "gust": 3.84
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-25 18:00:00"
  }, {
      "dt": 1708894800,
      "main": {
          "temp": -0.74,
          "feels_like": -4.81,
          "temp_min": -0.74,
          "temp_max": -0.74,
          "pressure": 995,
          "sea_level": 995,
          "grnd_level": 874,
          "humidity": 75,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 3.49,
          "deg": 150,
          "gust": 5.1
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-25 21:00:00"
  }, {
      "dt": 1708905600,
      "main": {
          "temp": -0.48,
          "feels_like": -4.72,
          "temp_min": -0.48,
          "temp_max": -0.48,
          "pressure": 991,
          "sea_level": 991,
          "grnd_level": 871,
          "humidity": 83,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }],
      "clouds": {
          "all": 88
      },
      "wind": {
          "speed": 3.79,
          "deg": 122,
          "gust": 7.31
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-26 00:00:00"
  }, {
      "dt": 1708916400,
      "main": {
          "temp": -3.19,
          "feels_like": -5.84,
          "temp_min": -3.19,
          "temp_max": -3.19,
          "pressure": 989,
          "sea_level": 989,
          "grnd_level": 868,
          "humidity": 97,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 94
      },
      "wind": {
          "speed": 1.77,
          "deg": 115,
          "gust": 3.11
      },
      "visibility": 10000,
      "pop": 0.01,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-26 03:00:00"
  }, {
      "dt": 1708927200,
      "main": {
          "temp": -3.13,
          "feels_like": -3.13,
          "temp_min": -3.13,
          "temp_max": -3.13,
          "pressure": 985,
          "sea_level": 985,
          "grnd_level": 864,
          "humidity": 90,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 97
      },
      "wind": {
          "speed": 0.47,
          "deg": 216,
          "gust": 0.76
      },
      "visibility": 10000,
      "pop": 0.01,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-26 06:00:00"
  }, {
      "dt": 1708938000,
      "main": {
          "temp": -3.92,
          "feels_like": -10.71,
          "temp_min": -3.92,
          "temp_max": -3.92,
          "pressure": 986,
          "sea_level": 986,
          "grnd_level": 865,
          "humidity": 95,
          "temp_kf": 0
      },
      "weather": [{
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 61
      },
      "wind": {
          "speed": 6.52,
          "deg": 348,
          "gust": 11.94
      },
      "visibility": 4936,
      "pop": 0.25,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-26 09:00:00"
  }, {
      "dt": 1708948800,
      "main": {
          "temp": -8.8,
          "feels_like": -15.8,
          "temp_min": -8.8,
          "temp_max": -8.8,
          "pressure": 994,
          "sea_level": 994,
          "grnd_level": 870,
          "humidity": 87,
          "temp_kf": 0
      },
      "weather": [{
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13n"
      }],
      "clouds": {
          "all": 81
      },
      "wind": {
          "speed": 10.74,
          "deg": 338,
          "gust": 15.53
      },
      "visibility": 345,
      "pop": 0.8,
      "snow": {
          "3h": 0.82
      },
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-26 12:00:00"
  }, {
      "dt": 1708959600,
      "main": {
          "temp": -14.25,
          "feels_like": -21.25,
          "temp_min": -14.25,
          "temp_max": -14.25,
          "pressure": 1005,
          "sea_level": 1005,
          "grnd_level": 877,
          "humidity": 87,
          "temp_kf": 0
      },
      "weather": [{
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13d"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 10.89,
          "deg": 343,
          "gust": 18.12
      },
      "visibility": 295,
      "pop": 1,
      "snow": {
          "3h": 1.09
      },
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-26 15:00:00"
  }, {
      "dt": 1708970400,
      "main": {
          "temp": -16.82,
          "feels_like": -23.82,
          "temp_min": -16.82,
          "temp_max": -16.82,
          "pressure": 1015,
          "sea_level": 1015,
          "grnd_level": 884,
          "humidity": 85,
          "temp_kf": 0
      },
      "weather": [{
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13d"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 10.77,
          "deg": 343,
          "gust": 16.81
      },
      "visibility": 410,
      "pop": 1,
      "snow": {
          "3h": 0.9
      },
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-26 18:00:00"
  }, {
      "dt": 1708981200,
      "main": {
          "temp": -17.16,
          "feels_like": -24.16,
          "temp_min": -17.16,
          "temp_max": -17.16,
          "pressure": 1020,
          "sea_level": 1020,
          "grnd_level": 888,
          "humidity": 84,
          "temp_kf": 0
      },
      "weather": [{
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13d"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 10.33,
          "deg": 349,
          "gust": 14.69
      },
      "visibility": 458,
      "pop": 0.65,
      "snow": {
          "3h": 0.42
      },
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-26 21:00:00"
  }, {
      "dt": 1708992000,
      "main": {
          "temp": -17.78,
          "feels_like": -24.78,
          "temp_min": -17.78,
          "temp_max": -17.78,
          "pressure": 1024,
          "sea_level": 1024,
          "grnd_level": 892,
          "humidity": 82,
          "temp_kf": 0
      },
      "weather": [{
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13d"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 7.87,
          "deg": 360,
          "gust": 12.47
      },
      "visibility": 2965,
      "pop": 0.56,
      "snow": {
          "3h": 0.19
      },
      "sys": {
          "pod": "d"
      },
      "dt_txt": "2024-02-27 00:00:00"
  }, {
      "dt": 1709002800,
      "main": {
          "temp": -18.76,
          "feels_like": -25.76,
          "temp_min": -18.76,
          "temp_max": -18.76,
          "pressure": 1028,
          "sea_level": 1028,
          "grnd_level": 895,
          "humidity": 86,
          "temp_kf": 0
      },
      "weather": [{
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
      }],
      "clouds": {
          "all": 100
      },
      "wind": {
          "speed": 4.77,
          "deg": 2,
          "gust": 7.73
      },
      "visibility": 712,
      "pop": 0.13,
      "sys": {
          "pod": "n"
      },
      "dt_txt": "2024-02-27 03:00:00"
  }],
  "city": {
      "id": 5913490,
      "name": "Calgary",
      "coord": {
          "lat": 51.0501,
          "lon": -114.0853
      },
      "country": "CA",
      "population": 1019942,
      "timezone": -25200,
      "sunrise": 1708526307,
      "sunset": 1708563713
  }
};