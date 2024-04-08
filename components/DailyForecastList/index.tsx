import { FC, memo, useMemo } from 'react';
import { FlatList } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DailyForecastInfo } from './DailyForecartInfo';
import { Forecast } from '../../types/Forecast';
import { ForecastListItem } from '../../types/ForecastListItem';
import { getDailyList, getCurrentTime  } from '../../units/helpers';

type NavigationProp = StackNavigationProp<ParamListBase, 'DateForecastScreen'>;
type Props = {
  weatherData: Forecast;
  isDay: boolean;
}

export const DailyForecastList: FC<Props> = memo(({ weatherData, isDay }) => {
  const weatherList = weatherData?.list.filter((weather: ForecastListItem) => getCurrentTime(weather.dt_txt) === '15:00');
  const dailyList = useMemo(() => getDailyList(weatherData), [weatherData]);
  const navigation: NavigationProp = useNavigation();

  const renderItem = ({ item, index }: { item: ForecastListItem, index: number }) => {
    const currentDate = `${new Date(item.dt_txt).getFullYear()}-${new Date(item.dt_txt).getMonth() + 1}-${new Date(item.dt_txt).getDate()}`;
    const temperatures = dailyList[currentDate].map((temperature: ForecastListItem) => temperature.main.temp);
    const maxTemperature = Math.round(Math.max(...temperatures));
    const minTemperature = Math.round(Math.min(...temperatures));
    const onPress = () => navigation.navigate('DaysForecast', { weatherData, currentDate, currentIndex: index });

    return (
      <DailyForecastInfo 
        weatherInfo={item}
        maxTemp={maxTemperature} 
        minTemp={minTemperature} 
        isDay={isDay}
        onPress={onPress}
      />
    )
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ paddingTop: 24 }}
      data={weatherList}
      renderItem={renderItem} 
      keyExtractor={(item) => item.dt_txt}
    />
  );
});