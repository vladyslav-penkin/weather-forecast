import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 48px;
  gap: 16px;
  border-radius: 6px;
  margin: 0 0 10px 0;
`;

export const SearchInput = styled.TextInput<{ color: string }>`
  outline: 0;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  padding: 0 36px;
  min-height: 48px;
  color: ${({ color }) => color};
  z-index: 1;
`;

export const Icon = styled(Ionicons)`
  position: absolute;
  top: 16px;
  padding: 0 0 0 12px;
`;

export const CancelText = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 16px;
`;