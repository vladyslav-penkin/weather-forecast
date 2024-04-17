import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const DateListContainer = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 88px;
  padding: 16px;
`;

export const DateListAnimatedBox = styled(Animated.View)<{ color: string }>`
  position: absolute;
  width: 45px;
  height: 56px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
  z-index: -1;
`;