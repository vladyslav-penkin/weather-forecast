import { FC, memo, useState } from 'react';
import { FlatList } from 'react-native';
import { Forecast } from '../../types/Forecast';
import { LocationCard } from '../../components/LocationCard';

type Props = {
  locations: Forecast[];
  setWeatherDataList: React.Dispatch<React.SetStateAction<Forecast[]>>;
  isFocused: boolean;
};

export const LocationList: FC<Props> = memo(({ locations, isFocused, setWeatherDataList }) => {
  const [isOpened, setOpened] = useState<number | null>(null);

  const renderItem = ({ item, index }: { item: Forecast, index: number } ) => {
    const currentTime = new Date(item?.list[0]?.dt_txt);
    const sunriseDate = new Date((item.city.sunrise + item.city.timezone) * 1000);
    const sunsetDate = new Date((item.city.sunset + item.city.timezone) * 1000);
  
    const sunriseTime = sunriseDate.getHours() + sunriseDate.getMinutes() / 60;
    const sunsetTime = sunsetDate.getHours() + sunsetDate.getMinutes() / 60
    const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
    const isDay = currentHour >= sunriseTime && currentHour <= sunsetTime;
  
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