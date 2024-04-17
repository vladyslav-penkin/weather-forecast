import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const HourlyForecastInfoContainer = styled(Animated.View)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-horizontal: 5px; 
  min-width: 60px; 
  margin: 0 5px;
  padding: 0 5px;
  border-radius: 10px;
`;

export const ForecastContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 0;
`;