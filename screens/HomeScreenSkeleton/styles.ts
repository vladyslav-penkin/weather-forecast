import styled from 'styled-components/native';

export const HomeSkeletonContainer = styled.ScrollView<{ color: string }>`
  display: flex;
  widht: 100%;
  height: 100%;
  background-color: ${({ color }) => color}
`;

export const HomeSkeletonHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const HomeSkeletonList = styled.View`
  display: flex;
  gap: 20px;
  margin: 20px 0 0 0;
`;