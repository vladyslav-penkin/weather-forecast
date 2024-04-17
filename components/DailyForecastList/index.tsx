import { FC, memo, useMemo } from 'react';
import { FlatList } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DailyForecastInfo } from './DailyForecartInfo';
import { Forecast } from '../../types/Forecast';
import { ForecastListItem } from '../../types/ForecastListItem';
import { getDailyList, formatTime, calculateSunriseAndSunsetDate, calculateIsDay } from '../../units/helpers';
import { format } from 'date-fns';

type NavigationProp = StackNavigationProp<ParamListBase, 'DateForecastScreen'>;
type Props = {
  weatherData: Forecast;
}

export const DailyForecastList: FC<Props> = memo(({ weatherData }) => {
  const weatherList = weatherData?.list.filter((weather: ForecastListItem) => (
    formatTime(new Date(weather.dt_txt)) === '15:00'
  ));
  const dailyList = useMemo(() => getDailyList(weatherData), [weatherData]);
  const navigation: NavigationProp = useNavigation();

  const renderItem = ({ item, index }: { item: ForecastListItem, index: number }) => {
    const currentDateKey = format(new Date(item.dt_txt), 'yyyy-MM-dd');
    const temperatures = dailyList[currentDateKey].map((temperature: ForecastListItem) => temperature.main.temp);
    const maxTemperature = Math.round(Math.max(...temperatures));
    const minTemperature = Math.round(Math.min(...temperatures));
    
    const currentDate = new Date(item.dt_txt);
    const { sunriseDate, sunsetDate } = calculateSunriseAndSunsetDate(weatherData?.city.sunrise, weatherData?.city.sunset, weatherData?.city.timezone);
    const { isDay } = calculateIsDay(sunriseDate, sunsetDate, currentDate);
    const onPress = () => navigation.navigate('DaysForecast', { weatherData, currentDate: currentDateKey, currentIndex: index });

    return (
      <DailyForecastInfo 
        weatherInfo={item}
        maxTemp={maxTemperature} 
        minTemp={minTemperature} 
        isDay={isDay}
        currentIndex={index}
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
      keyExtractor={item => item.dt_txt}
    />
  );
});