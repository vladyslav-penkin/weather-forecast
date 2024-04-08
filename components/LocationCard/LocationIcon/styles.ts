import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const LocationIconContainer = styled(Animated.View)<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
  min-width: 80px;
  min-height: 104px;
  border-radius: 15px;
`;