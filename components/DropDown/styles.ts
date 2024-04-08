import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const DropDownContainer = styled(Animated.View)`
  z-index: 100;
`;

export const DropDownList = styled.View<{ bgColor: string, borderColor: string }>`
  position: absolute;
  top: 0;
  right: 0;
  min-width: 193px;
  padding: 10px 16px;
  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 15px;
`;

export const DropDownItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 48px;
`;

export const DropDownItemSelected = styled.View`
  min-width: 16px;
  min-height: 16px;
`;

export const DropDownItemText = styled.Text<{ color: string }>`
  font-family: 'NunitoMedium';
  color: ${({ color }) => color};
  font-size: 16px;
  padding: 10px 0;
  margin: 0 0 0 10px;
`;

export const DropDownText = styled.Text<{ color: string }>`
  font-family: 'NunitoMedium';
  color: ${({ color }) => color};
  font-size: 16px;
`;
