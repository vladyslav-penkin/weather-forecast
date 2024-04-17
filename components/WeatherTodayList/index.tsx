import { FC, memo } from 'react';
import { FlatList } from 'react-native';
import { WeatherTodayItem } from '../../components/WeatherTodayItem';
import { DailyList } from '../../types/DailyList';
import { getCurrentTime, getCurrentTypeOfDay } from '../../units/helpers';
import { ForecastListItem } from '../../types/ForecastListItem';

type Props = {
  dailyList: DailyList;
  selectedDate: string;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export const WeatherTodayList: FC<Props> = memo(({ dailyList, selectedDate, sunrise, sunset, timezone }) => {
  const weatherTodayItem = ({ item, index }: { item: ForecastListItem, index: number }) => {
    const times = ['09:00', '15:00', '18:00', '21:00', '9:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'];
    const currentDateTime = getCurrentTime(item.dt_txt);
    const currentTime = new Date(item.dt_txt);
    const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
    
    const sunriseDate = new Date((sunrise + timezone) * 1000);
    const sunsetDate = new Date((sunset + timezone) * 1000);
    const sunriseTime = sunriseDate.getHours() + sunriseDate.getMinutes() / 60;
    const sunsetTime = sunsetDate.getHours() + sunsetDate.getMinutes() / 60;
    const isDay = currentHour >= sunriseTime && currentHour <= sunsetTime;

    if (!times.includes(currentDateTime)) return null;

    const dayType = getCurrentTypeOfDay(currentDateTime);
    return <WeatherTodayItem weatherInfo={item} currentIndex={index} dayType={dayType} isDay={isDay} />
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={dailyList[selectedDate] ?? []}
      renderItem={weatherTodayItem}
      keyExtractor={(item) => item.dt_txt}
    />
  );
});