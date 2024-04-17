import { FC, memo, useEffect, useMemo } from 'react';
import { EditableLocationCard, LocationContainer, LocationImageContainer, LocationInfoContainer, LocationTemperatureContainer } from './styles';
import { Pressable, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BasicCard } from '../../components/BasicCard';
import { PrimaryText } from '../../components/PrimaryText';
import { SecondaryText } from '../../components/SecondaryText';
import { LocationIcon } from './LocationIcon';
import { useTheme } from '../../hooks/useTheme';
import { useLocations } from '../../hooks/useLocations';
import { useAnimatedTransition } from '../../hooks/useAnimatedTransition';
import { getCurrentTime, getFormattedDescription, getWeatherIcon } from '../../units/helpers';
import { ForecastListItem } from '../../types/ForecastListItem';
import { Forecast } from '../../types/Forecast';
import { EntypoIcons } from '../../types/Icons';

type NavigationProp = StackNavigationProp<ParamListBase, 'Weather'>;
interface LocationCardProps {
  isFocused: boolean;
  isOpened: number | null;
  setOpened: React.Dispatch<React.SetStateAction<number | null>>;
  setWeatherDataList: React.Dispatch<React.SetStateAction<Forecast[]>>;
  weatherInfo: Forecast;
  currentIndex: number;
  isDay: boolean;
};

const getMinMaxTemperatures = (temperatures: number[]): { minTemp: number; maxTemp: number } => {
  const minTemp = Math.round(Math.min(...temperatures));
  const maxTemp = Math.round(Math.max(...temperatures));
  return { minTemp, maxTemp };
};

export const LocationCard: FC<LocationCardProps> = memo(({ 
  isFocused, 
  isOpened, 
  setOpened, 
  setWeatherDataList,
  weatherInfo: { list, city: { id, name, coord: { lat, lon } } }, 
  currentIndex,
  isDay,
}) => {
  const { theme: { colors } } = useTheme();
  const { locations,  setCurrentLocation, setLocations } = useLocations();
  const navigation: NavigationProp = useNavigation();
  const currentTime = getCurrentTime(list[0].dt_txt);
  const isEqual = isOpened === id;

  const temperatures = useMemo(() => list.map((temperature: ForecastListItem) => temperature.main.temp), [list]);
  const currentTemp = Math.round(list[0].main.temp)
  const { minTemp, maxTemp } = getMinMaxTemperatures(temperatures);
  const description = getFormattedDescription(list[0].weather[0].description);

  const onOpen = () => setOpened(isEqual ? null : id);
  const onPress = () => {
    const newLocation = { id: id, lat, lon };
    setOpened(null);
    setCurrentLocation(prev => prev?.id !== newLocation.id ? newLocation : prev);
    navigation.navigate('Weather');
  };
  const onRemove = async () => {
    setOpened(null);
    setWeatherDataList(prev => prev.filter(({ city }) => city.id !== id));
    const newLocations = locations.filter((location) => location?.id !== id);
    setLocations(newLocations);
    setCurrentLocation(newLocations.length > 0 ? { id: newLocations[0].id, lat: newLocations[0].lat, lon: newLocations[0].lon } : null);
  };
  const locationIcons = [
    { onPress: onPress, icon: EntypoIcons.LOCATION, size: 24, bgColor: colors.locationColor, color: 'white' },
    { onPress: onRemove, icon: EntypoIcons.TRASH, size: 24, bgColor: colors.cancelColor, color: 'white' }
  ];

  const translateX = useSharedValue(0);
  const transitionStyle = {
    duration: 1000,
    dampingRatio: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };
  const animatedStyle = useAnimatedTransition(!isFocused, currentIndex);
  const animatedEditStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX.value, transitionStyle) }]
  }), [translateX.value]);

  useEffect(() => {
    setOpened(null);
  }, [isFocused]);

  useEffect(() => {
    translateX.value = isEqual ? -190 : 0;
  }, [isEqual]);

  const LocationImage = getWeatherIcon(isDay, list[0].weather[0].id);
  
  return (
    <EditableLocationCard style={[animatedEditStyle]}>
      <Pressable onPress={onOpen} style={{ width: '100%' }}>
        <BasicCard style={[animatedStyle, { display: !isFocused ? 'flex' : 'none' }]}>
          <LocationContainer>
            <LocationInfoContainer>
              <SecondaryText title={currentTime} size={12} />
              <PrimaryText title={name} size={20} />
              <View style={{ paddingTop: 5 }}>
                <PrimaryText title={description} size={12} />
              </View>
            </LocationInfoContainer>

            <LocationTemperatureContainer>
              <PrimaryText title={`${currentTemp}°`} size={26} />
              <PrimaryText title={`↓ ${minTemp}° ↑ ${maxTemp}°`} size={14} />
            </LocationTemperatureContainer>

            <LocationImageContainer>
              <LocationImage style={{ width: '100%', height: '100%' }} />
            </LocationImageContainer>
          </LocationContainer>
        </BasicCard>
      </Pressable>

      {locationIcons.map(({ icon, size, bgColor, color, onPress }) => (
        <LocationIcon
          key={icon}
          onPress={onPress} 
          icon={icon} 
          size={size} 
          bgColor={bgColor} 
          color={color}
        />
      ))}
    </EditableLocationCard>
  );
});