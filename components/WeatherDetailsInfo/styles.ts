import styled from 'styled-components/native';

export const WeatherDetailsInfoContainer = styled.View<{ size: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  flex-basis: ${({ size }) => size};
  min-height: 60px;
  z-index: 2;
`;