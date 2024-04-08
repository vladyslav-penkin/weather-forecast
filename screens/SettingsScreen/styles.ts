import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const SettingsScreenContainer = styled.View<{ color: string }>`
  display: flex;
  gap: 20px;
  height: 100%;
  background-color: ${({ color }) => color};
`;

export const SettingsScreenBackground = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: black;
`;

export const SettingsWarningScreen = styled(BlurView)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100%;
`;