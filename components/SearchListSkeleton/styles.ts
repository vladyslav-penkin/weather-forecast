import styled from 'styled-components/native';

export const SearchListSkeletonContainer = styled.View<{ color: string }>`
  display: flex;
  widht: 100%;
  height: 100%;
  background-color: ${({ color }) => color}
`;

export const SearchListSkeletons = styled.View`
  display: flex;
  gap: 10px;
  margin: 20px 0 0 0;
`;