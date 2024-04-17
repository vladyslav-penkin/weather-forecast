import { FC, memo } from 'react';
import { FlatList } from 'react-native';
import { WeatherTodayItem } from '../../components/WeatherTodayItem';
import { DailyList } from '../../types/DailyList';
import { calculateIsDay, calculateSunriseAndSunsetDate, formatTime, getCurrentTime, getCurrentTypeOfDay } from '../../units/helpers';
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
    const times = ['09:00', '15:00', '18:00', '21:00'];
    const currentDate = new Date(item.dt_txt);
    const formatedTime = formatTime(currentDate);

    const { sunriseDate, sunsetDate } = calculateSunriseAndSunsetDate(sunrise, sunset, timezone);
    const { isDay } = calculateIsDay(sunriseDate, sunsetDate, currentDate);

    if (!times.includes(formatedTime)) return null;

    const dayType = getCurrentTypeOfDay(formatedTime);
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