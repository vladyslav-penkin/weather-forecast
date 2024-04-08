import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const SkeletonCard = styled(Animated.View)<{ color: string }>`
  background-color: ${({ color }) => color};
`;