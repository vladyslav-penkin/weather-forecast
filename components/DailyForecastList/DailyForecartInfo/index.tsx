import { FC, memo, useMemo } from 'react';
import { WeatherInfo, Temperature, TemperatureImage, TemperatureContainer, StyledTouchableOpacity, StyledView, AverageTemperature } from './styles';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SecondaryText } from '../../SecondaryText';
import { PrimaryText } from '../../PrimaryText';
import { WeatherIcon } from '../../WeatherIcon';
import { useTheme } from '../../../hooks/useTheme';
import { useAnimatedTransition } from '../../../hooks/useAnimatedTransition';
import { ForecastListItem } from '../../../types/ForecastListItem';
import { dayOfWeek, getPercentFromTemperature, monthOfYear } from '../../../units/helpers';

type Props = {
  weatherInfo: ForecastListItem;
  maxTemp: number;
  minTemp: number;
  isDay: boolean;
  currentIndex: number;
  onPress: () => void;
};

const getFormattedDescription = (description: string): string => {
  return description
    .split(' ')
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ');
};

export const DailyForecastInfo: FC<Props> = memo(({
  weatherInfo: { dt_txt, weather, main: { temp }},
  maxTemp,
  minTemp,
  isDay,
  currentIndex,
  onPress,
}) => {
  const { theme: { colors } } = useTheme();
  const currentDate = useMemo(() => new Date(dt_txt), [dt_txt]);
  const date = currentDate.getDate();
  const day = dayOfWeek[currentDate.getDay()].slice(0, 2).toUpperCase();
  const month = monthOfYear[currentDate.getMonth() + 1];
  const description = getFormattedDescription(weather[0].description);

  const positionLeft = useSharedValue<number>(getPercentFromTemperature(Math.round(temp), minTemp, maxTemp));
  const transitionStyle = {
    duration: 1000,
    dampingRatio: 1,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };
  const animatedPointTemperature = useAnimatedStyle(() => ({
    left: withSpring(`${positionLeft.value}%`, transitionStyle),
  }));
  const animatedStyle = useAnimatedTransition(true, currentIndex);

  return (
    <Animated.View style={animatedStyle}>
      <StyledTouchableOpacity onPress={onPress}>
      <WeatherIcon iconId={weather[0].id} isDay={isDay} />
      <StyledView>
        <WeatherInfo>
          <PrimaryText title={`${day}, ${date} ${month}`} />
          <SecondaryText title={description} size={12} />
        </WeatherInfo>

        <TemperatureContainer>
          <Temperature>
            <SecondaryText title={`${minTemp}°`} size={16} />
            <PrimaryText title={`${maxTemp}°`} size={16} />
          </Temperature>

          <View style={{ position: 'relative', maxHeight: 3 }}>
            <TemperatureImage
              colors={colors.temperatureColors} 
              locations={[0.1, 1]}
              start={{ x: 0, y: 1 }}
            />

            <AverageTemperature 
              style={[animatedPointTemperature]} 
              bgColor={colors.primaryColor} 
              borderColor={colors.bgColor}
            />
          </View>
        </TemperatureContainer>
      </StyledView>
    </StyledTouchableOpacity>
    </Animated.View>
  );
});