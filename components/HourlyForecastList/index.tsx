import { FC, memo } from 'react';
import { FlatList } from 'react-native';
import { HourlyForecastInfo } from './HourlyForecastInfo';
import { Forecast } from '../../types/Forecast';
import { calculateSunriseAndSunsetDate, calculateIsDay } from '../../units/helpers';

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
        const currentDate = new Date(item.dt_txt);
        const { sunriseDate, sunsetDate } = calculateSunriseAndSunsetDate(city.sunrise, city.sunset, city.timezone);
        const { isDay } = calculateIsDay(sunriseDate, sunsetDate, currentDate);

        return <HourlyForecastInfo weatherInfo={item} isDay={isDay} nearestData={list[0].dt_txt} />
      }}
      keyExtractor={(weatherInfo) => weatherInfo.dt_txt}
    />
  );
});