import { FC, memo, useMemo } from 'react';
import { FlatList, Text } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DailyForecastInfo } from './DailyForecartInfo';
import { Forecast } from '../../types/Forecast';
import { ForecastListItem } from '../../types/ForecastListItem';
import { getDailyList, getCurrentTime  } from '../../units/helpers';

type NavigationProp = StackNavigationProp<ParamListBase, 'DateForecastScreen'>;
type Props = {
  weatherData: Forecast;
}

export const DailyForecastList: FC<Props> = memo(({ weatherData }) => {
  const weatherList = weatherData?.list.filter((weather: ForecastListItem) => {
    const time = ['3:00 PM', '15:00'];
    return time.includes(getCurrentTime(weather.dt_txt));
  });
  const dailyList = useMemo(() => getDailyList(weatherData), [weatherData]);
  const navigation: NavigationProp = useNavigation();

  const renderItem = ({ item, index }: { item: ForecastListItem, index: number }) => {
    const currentDate = `${new Date(item.dt_txt).getFullYear()}-${new Date(item.dt_txt).getMonth() + 1}-${new Date(item.dt_txt).getDate()}`;
    const temperatures = dailyList[currentDate].map((temperature: ForecastListItem) => temperature.main.temp);
    const maxTemperature = Math.round(Math.max(...temperatures));
    const minTemperature = Math.round(Math.min(...temperatures));
    const sunriseDate = new Date((weatherData?.city.sunrise + weatherData?.city.timezone) * 1000);
    const sunsetDate = new Date((weatherData?.city.sunset + weatherData?.city.timezone) * 1000);
  
    const sunriseTime = sunriseDate.getHours() + sunriseDate.getMinutes() / 60;
    const sunsetTime = sunsetDate.getHours() + sunsetDate.getMinutes() / 60;
    const currentTime = new Date(item.dt_txt);
    const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
    const isDay = currentHour >= sunriseTime && currentHour <= sunsetTime;

    const onPress = () => navigation.navigate('DaysForecast', { weatherData, currentDate, currentIndex: index });

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
    />
  );
});