import styled from 'styled-components/native';

export const DaysForecastSkeletonContainer = styled.View<{ color: string }>`
  display: flex;
  widht: 100%;
  height: 100%;
  background-color: ${({ color }) => color}
`;

export const DaysForecastSkeletonList = styled.View`
  display: flex;
  gap: 10px;
  margin: 20px 0 0 0;
`;