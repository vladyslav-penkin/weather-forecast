import styled from 'styled-components/native';

export const LocationSkeletonContainer = styled.View<{ color: string }>`
  display: flex;
  widht: 100%;
  height: 100%;
  background-color: ${({ color }) => color}
`;

export const LocationSkeletonList = styled.View`
  display: flex;
  gap: 20px;
  margin: 20px 0 0 0;
`;