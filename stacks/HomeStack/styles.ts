import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const HomeStackDetailsContainer = styled(Animated.View)`
  margin-right: 10px;
`;

export const HomeStackDetailsButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HomeStackTempContainer = styled(Animated.View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 60px;
  margin-right: 10px;
`;

export const HomeStackGeolocationContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;