import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const EditableLocationCard = styled(Animated.View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const LocationContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
`;

export const LocationInfoContainer = styled.View`
  max-width: 120px;
  display: flex;
  flex-grow: 1;
`;

export const LocationTemperatureContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-height: 64px;
`;

export const LocationImageContainer = styled.View`
  width: 64px;
  height: 64px;
`;

export const LocationImage = styled.Image`
  width: 100%;
  height: 100%;
`;