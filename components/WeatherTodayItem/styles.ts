import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const WeatherTodayTemperatureContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  padding: 16px 0 0;
`;

export const TodayTemperatureContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const WeatherTodayItemContainer = styled(Animated.View)<{ color: string }>`
  dispay: flex;
  padding: 0 24px 16px 24px;
  margin: 0 0 16px 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${({ color }) => color};
`;

export const WeatherTodayInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 16px 0 0;
`;

export const WeatherImageContainer = styled.View`
  width: 56px;
  height: 56px; 
`;

export const WeatherImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const StyledView = styled.View`
  display: flex;
  justify-content: space-between;
`;