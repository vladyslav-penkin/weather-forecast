import styled from 'styled-components/native';

export const LocationScreenContainer = styled.View<{ color: string }>`
  padding: 16px 0 0 0;
  background-color: ${({ color }) => color};
  height: 100%;
`;