import { FC, memo, useState } from 'react';
import { FlatList } from 'react-native';
import { Forecast } from '../../types/Forecast';
import { LocationCard } from '../../components/LocationCard';
import { calculateSunriseAndSunsetDate, calculateIsDay } from '../../units/helpers';

type Props = {
  locations: Forecast[];
  setWeatherDataList: React.Dispatch<React.SetStateAction<Forecast[]>>;
  isFocused: boolean;
};

export const LocationList: FC<Props> = memo(({ locations, isFocused, setWeatherDataList }) => {
  const [isOpened, setOpened] = useState<number | null>(null);

  const renderItem = ({ item, index }: { item: Forecast, index: number } ) => {
    const currentDate = new Date(item?.list[0]?.dt_txt);
    const { sunriseDate, sunsetDate } = calculateSunriseAndSunsetDate(item.city.sunrise, item.city.sunset, item.city.timezone);
    const { isDay } = calculateIsDay(sunriseDate, sunsetDate, currentDate);
  
    return (
      <LocationCard 
        key={item.city.id}
        isFocused={isFocused} 
        isOpened={isOpened} 
        setOpened={setOpened} 
        setWeatherDataList={setWeatherDataList}
        weatherInfo={item} 
        currentIndex={index}
        isDay={isDay}
      />
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ display: 'flex', marginBottom: 40 }}
      data={locations}
      renderItem={renderItem}
      keyExtractor={(item) => item.city.id.toString()}
    />
  );
});