import { FC, memo } from 'react';
import { FlatList } from 'react-native';
import { HourlyForecastInfo } from './HourlyForecastInfo';
import { Forecast } from '../../types/Forecast';

type Props = {
  weatherData: Forecast;
  isDay: boolean;
}

export const HourlyForecastList: FC<Props> = memo(({ weatherData: { list } }, isDay): JSX.Element => {
  const hourlyList = list.slice(0, 9);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={{ paddingTop: 10 }}
      data={hourlyList}
      horizontal
      renderItem={({ item }) => (
        <HourlyForecastInfo weatherInfo={item} isDay={isDay} nearestData={list[0].dt_txt} />
      )} 
      keyExtractor={(weatherInfo) => weatherInfo.dt_txt}
    />
  );
});