import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';

export const WarningContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const WarningBackground = styled(BlurView)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100%;
`;

export const WarningCard = styled(Animated.View)<{ bgColor: string, borderColor: string }>`
  display: flex;
  max-width: 323px;
  padding: 24px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ borderColor }) => borderColor};
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 16px;
`;

export const WarningButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding-top: 10px;
`;