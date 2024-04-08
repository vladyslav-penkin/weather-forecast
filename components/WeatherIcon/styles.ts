import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Card = styled.View`
  position: relative;
  width: 48px;
  height: 48px;
`;

export const CardBackground = styled(LinearGradient)`
  position: absolute;
  border-radius: 12px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Humidity = styled.Text<{ bgColor: string, color: string }>`
  position: absolute;
  min-width: 32px;
  max-height: 20px;
  bottom: -5px;
  right: -6px;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border-radius: 5px;
  padding: 3px;
  font-size: 10px;
`;