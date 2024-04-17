import { Forecast } from '../types/Forecast';
import { ForecastListItem } from '../types/ForecastListItem';
import SunnyRain from '../assets/static/sunnyRain.svg';
import SmallRain from '../assets/static/smallRain.svg';
import HeavyRain from '../assets/static/heavyRain.svg';
import Rain from '../assets/static/rain.svg';
import OnlySnow from '../assets/static/onlySnow.svg';
import Sunny from '../assets/static/sunny.svg';
import ClearNight from '../assets/static/clearNight.svg';
import Cloudy from '../assets/static/cloudy.svg';
import NightCloudy from '../assets/static/nightCloudy.svg';
import SunnyCloudy from '../assets/static/sunnyCloudy.svg';
import Sunrise from '../assets/static/sunrise.svg';
import Sunset from '../assets/static/sunset.svg';
import Daylight from '../assets/static/daylight.svg';
import { differenceInMinutes, format, isWithinInterval } from 'date-fns';

type IconComponentProps = {
  style?: object;
  otherProps?: any;
}
type IconComponent = (props: IconComponentProps) => JSX.Element;

type DailyList = {
  [key: string]: ForecastListItem[];
}

export const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const monthOfYear: { [key: string]: string } = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'Jule',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const getDailyList = (weatherData: Forecast): DailyList => {
  const list = weatherData?.list ?? [];
  
  return list.reduce((acc: DailyList, curr: ForecastListItem) => {
    const day = format(new Date(curr.dt_txt), 'yyyy-MM-dd');

    if (!acc.hasOwnProperty(day)) acc[day] = [];
    acc[day].push(curr);

    return acc;
  }, {});
};

export const getCurrentTypeOfDay = (currentTime: string) => {
  switch (currentTime) {
    case '09:00':
      return 'morning';
    case '15:00':
      return 'afternoon';
    case '18:00':
      return 'evening';
    case '21:00':
      return 'night';
    default:
      return 'night';
  };
};

export const getFormattedDescription = (description: string): string => {
  return description
    .split(' ')
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ');
};

export const getTwoDigitsTime = (date: string) => new Date(date).getHours() + new Date(date).getMinutes() / 60;

export const getCurrentTime = (time: string): string => {
  return new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const getPercentFromTemperature = (temp: number, minTemp: number, maxTemp: number): number => {
  if (temp === minTemp && temp === maxTemp) return 0;
  else if (temp < minTemp) temp = minTemp;
  else if (temp > maxTemp) temp = maxTemp;

  return Math.round(((temp - minTemp) / (maxTemp - minTemp)) * 100);
};

export const formatUTCTime = (date: Date) => {
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const formatSunriseAndSunsetTime = (sunrise: Date, sunset: Date) => {
  return {
    sunrise: formatUTCTime(sunrise),
    sunset: formatUTCTime(sunset),
  };
};

export const calculateSunriseAndSunsetDate = (sunriseTimestamp: number, sunsetTimestamp: number, timezoneOffset: number) => {
  const sunriseDate = new Date((sunriseTimestamp + timezoneOffset) * 1000);
  const sunsetDate = new Date((sunsetTimestamp + timezoneOffset) * 1000);

  return { sunriseDate, sunsetDate };
};

export const calculateDaylightHours = (sunriseDate: Date, sunsetDate: Date) => {
  const sunriseTime = sunriseDate.getUTCHours() + sunriseDate.getUTCMinutes() / 60;
  const sunsetTime = sunsetDate.getUTCHours() + sunsetDate.getUTCMinutes() / 60;
  const daylightHours = Math.floor(sunsetTime - sunriseTime);
  const daylightMinutes = differenceInMinutes(sunsetDate, sunriseDate) % 60;

  return { daylightHours, daylightMinutes, sunriseTime, sunsetTime };
};

export const calculateIsDay = (sunriseDate: Date, sunsetDate: Date, currentDate: Date) => {
  const sunriseTime = sunriseDate.getUTCHours() + sunriseDate.getUTCMinutes() / 60;
  const sunsetTime = sunsetDate.getUTCHours() + sunsetDate.getUTCMinutes() / 60;
  const currentTime = currentDate.getHours() + currentDate.getMinutes() / 60;
  const isDay = isWithinInterval(currentTime, { start: sunriseTime, end: sunsetTime });

  return { isDay, sunriseTime, sunsetTime, currentTime };
};

export const getIconComponent = (name: string): IconComponent => {
  switch (name) {
    case 'sunnyRain':
      return ({ style, ...otherProps }: IconComponentProps) => <SunnyRain style={style} {...otherProps} />;
    case 'smallRain':
      return ({ style, ...otherProps }: IconComponentProps) => <SmallRain style={style} {...otherProps} />;
    case 'heavyRain':
      return ({ style, ...otherProps }: IconComponentProps) => <HeavyRain style={style} {...otherProps} />;
    case 'onlySnow':
      return ({ style, ...otherProps }: IconComponentProps) => <OnlySnow style={style} {...otherProps} />;
    case 'rain':
      return ({ style, ...otherProps }: IconComponentProps) => <Rain style={style} {...otherProps} />;
    case 'sunny':
      return ({ style, ...otherProps }: IconComponentProps) => <Sunny style={style} {...otherProps} />;
    case 'clearNight':
      return ({ style, ...otherProps }: IconComponentProps) => <ClearNight style={style} {...otherProps} />;
    case 'cloudy':
      return ({ style, ...otherProps }: IconComponentProps) => <Cloudy style={style} {...otherProps} />;
    case 'nightCloudy':
      return ({ style, ...otherProps }: IconComponentProps) => <NightCloudy style={style} {...otherProps} />;
    case 'sunnyCloudy':
      return ({ style, ...otherProps }: IconComponentProps) => <SunnyCloudy style={style} {...otherProps} />;
    default:
      return ({ style, ...otherProps }: IconComponentProps) => <></>;
  }
};

export const getDailyIconComponent = (name: string): IconComponent => {
  switch (name) {
    case 'sunrise':
      return ({ style, ...otherProps }: IconComponentProps) => <Sunrise style={style} {...otherProps} />;
    case 'sunset':
      return ({ style, ...otherProps }: IconComponentProps) => <Sunset style={style} {...otherProps} />;
    case 'daylight':
      return ({ style, ...otherProps }: IconComponentProps) => <Daylight style={style} {...otherProps} />;
    default:
      return ({ style, ...otherProps }: IconComponentProps) => <></>;
  }
};

export const findIcon = (isDay: boolean, id: number) => {
  const isDayTime = isDay ? 'day' : 'night';
  const conditions: { [id: string]: string } = {
    '500': 'sunnyRain',
    '501': 'sunnyRain',
    '502': 'smallRain',
    '503': 'heavyRain',
    '504': 'heavyRain',
    '511': 'onlySnow',
    '600': 'onlySnow',
    '601': 'onlySnow',
    '602': 'onlySnow',
    '611': 'onlySnow',
    '612': 'onlySnow',
    '613': 'onlySnow',
    '615': 'onlySnow',
    '616': 'onlySnow',
    '620': 'onlySnow',
    '621': 'onlySnow',
    '622': 'onlySnow',
    '701': 'mist',
    '711': 'smoke',
    '721': 'haze',
    '731': 'dust',
    '741': 'fog',
    '751': 'sand',
    '761': 'dust',
    '762': 'ash',
    '771': 'squalls',
    '781': 'tornado',
    '800': isDayTime === 'day' ? 'sunny' : 'clearNight',
    '801': isDayTime === 'day' ? 'sunnyCloudy' : 'nightCloudy',
    '802': isDayTime === 'day' ? 'sunnyCloudy' : 'nightCloudy',
    '803': 'cloudy',
    '804': 'cloudy'
  };

  return conditions[id] || 'cloudy';
};

export const getWeatherIcon = (isDay: boolean, id: number): IconComponent => {
  // iconMapping[findIcon(isDay, id)]
  return getIconComponent(findIcon(isDay, id));
};
