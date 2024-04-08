import { FC, memo } from 'react';
import { FlatList } from 'react-native';
import { WeatherTodayItem } from '../../components/WeatherTodayItem';
import { DailyList } from '../../types/DailyList';
import { getCurrentTime, getCurrentTypeOfDay } from '../../units/helpers';
import { ForecastListItem } from '../../types/ForecastListItem';

type Props = {
  dailyList: DailyList;
  selectedDate: string;
  isDay: boolean;
}

export const WeatherTodayList: FC<Props> = memo(({ dailyList, selectedDate, isDay }) => {
  const weatherTodayItem = ({ item }: { item: ForecastListItem }) => {
    const times = ['09:00', '15:00', '18:00', '21:00'];
    const currentTime = getCurrentTime(item.dt_txt);

    if (!times.includes(currentTime)) return null;

    const dayType = getCurrentTypeOfDay(currentTime);
    return <WeatherTodayItem weatherInfo={item} dayType={dayType} isDay={isDay} />
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={dailyList[selectedDate]}
      renderItem={weatherTodayItem}
      keyExtractor={(item) => item.dt_txt}
    />
    
  );
});