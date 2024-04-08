import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export const StyledTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  padding: 5px 5px;
  gap: 10px;
  max-width: 425px;
  margin: 5px 5px 5px;
`;

export const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  margin: 5px 0;
  gap: 20px;
`;

export const TemperatureContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

export const WeatherInfo = styled.View`
  display: flex;
  justity-content: center;
  min-width: 86px;
  max-width: 120px;
`;

export const Temperature = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 2px;
`;

export const TemperatureImage = styled(LinearGradient)`
  width: 100%;
  min-height: 3px;
  border-radius: 20px;
`;

export const AverageTemperature = styled(Animated.View)<{ bgColor: string, borderColor: string }>`
  postiion: absolute;
  left: 0px;
  top: -5.5px;
  width: 8px;
  height: 8px;
  border-radius: 20px;
  background-color: ${({ bgColor }) => bgColor};
  borderWidth: 2px;
  border-style: solid;
  border-color: ${({ borderColor }) => borderColor};
`;