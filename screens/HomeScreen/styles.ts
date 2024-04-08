import styled from 'styled-components/native';

export const HomeBackground = styled.ScrollView<{ color: string }>`
  background-color: ${({ color }) => color};
`;

export const HomeScreenButtonContainer = styled.View<{ borderColor: string }>`
  margin: 16px 12px 0 12px;
  padding-top: 16px;
  border-top-width: 1px;
  border-style: solid;
  border-color: ${({ borderColor }) => borderColor};
`;