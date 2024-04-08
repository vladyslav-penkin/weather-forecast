import styled from 'styled-components/native';

export const DaysForecastContainer = styled.View<{ color: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color};
`;