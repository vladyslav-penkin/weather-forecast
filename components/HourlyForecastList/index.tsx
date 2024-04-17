import { FC, memo } from 'react';
import { FlatList } from 'react-native';
import { HourlyForecastInfo } from './HourlyForecastInfo';
import { Forecast } from '../../types/Forecast';

type Props = {
  weatherData: Forecast;
}

export const HourlyForecastList: FC<Props> = memo(({ weatherData: { list, city } }): JSX.Element => {
  const hourlyList = list.slice(0, 9);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={{ paddingTop: 10 }}
      data={hourlyList}
      horizontal
      renderItem={({ item }) => {
        const sunriseDate = new Date((city.sunrise + city.timezone) * 1000);
        const sunsetDate = new Date((city.sunset + city.timezone) * 1000);
  
        const sunriseTime = sunriseDate.getHours() + sunriseDate.getMinutes() / 60;
        const sunsetTime = sunsetDate.getHours() + sunsetDate.getMinutes() / 60;
        const currentTime = new Date(item.dt_txt);
        const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
        const isDay = currentHour >= sunriseTime && currentHour <= sunsetTime;
        return <HourlyForecastInfo weatherInfo={item} isDay={isDay} nearestData={list[0].dt_txt} />
      }}
      keyExtractor={(weatherInfo) => weatherInfo.dt_txt}
    />
  );
});