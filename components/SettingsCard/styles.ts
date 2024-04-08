import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const SettingsCardContainer = styled.View`
  position: relative;
  display: flex;
  gap: 20px;
  padding: 24px;
`;

export const ThemeBackground = styled(LinearGradient)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;