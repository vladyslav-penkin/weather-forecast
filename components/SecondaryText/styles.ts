import styled from 'styled-components/native';

interface TextProps {
  color: string;
  fontSize: number;
}

export const StyledText = styled.Text<TextProps>`
  font-family: 'NunitoMedium'; 
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color }) => color};
`;