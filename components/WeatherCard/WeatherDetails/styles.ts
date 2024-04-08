import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export const ContainerList = styled(Animated.View)`
  display: flex;
  gap: 2px;
`;

export const DaylightContainer = styled.View<{ borderColor: string }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 75px;
  border-top-left-radius: 9999px;
  border-top-right-radius: 9999px;
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: ${({ borderColor }) => borderColor};
  border-style: solid;
  z-index: -1;
`;

export const DaylightGradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  border-top-left-radius: 9999px;
  border-top-right-radius: 9999px;
`;

export const DaylightPointPosition = styled.View<{ bgColor: string }>`
  position: absolute;
  bottom: 0;
  min-width: 10px;
  min-height: 10px;
  border-radius: 50px;
  background-color: ${({ bgColor }) => bgColor};
`;

export const SunContainer = styled.View`
  position: absolute;
  left: 0;
  rigth: 0;
  min-width: 150px;
  min-height: 150px;
  border-radius: 9999px;
`;

export const DetailedInfoContainer = styled.View`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  flex-basis: 50%;
  min-height: 60px;
  z-index: 2;
`;

export const DetailedInfoSmallContainer = styled.View`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  flex-basis: 25%;
  min-height: 60px;
  z-index: 2;
`;

export const TemperatureContainer = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1px;
`;

export const TemperatureText = styled.Text<{ color: string }>`
  font-family: 'NunitoMedium';
  font-size: 14px;
  color: ${({ color }) => color};
`;