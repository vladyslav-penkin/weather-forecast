import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

export const Card = styled(Animated.View)<{ padding: string }>`
  position: relative;
  overflow: hidden;
  display: flex;
  border-radius: 15px;
  padding: ${({ padding }) => `${padding}px`};
  margin: 10px 0;
`;

export const CardBackground = styled(LinearGradient)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;