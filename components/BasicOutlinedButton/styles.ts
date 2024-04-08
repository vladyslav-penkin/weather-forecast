import styled from 'styled-components/native';

interface ButtonProps {
  buttonWidth: string;
  buttonHeight: string;
  borderColor: string;
}

interface TextProps {
  color: string;
  fontSize: number;
}

export const StyledButton = styled.TouchableOpacity<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 10px 5px;
  border-radius: 10px; 
  min-width: ${({ buttonWidth }) => buttonWidth};
  min-height: ${({ buttonHeight }) => buttonHeight};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ borderColor }) => borderColor};
`;

export const ButtonText = styled.Text<TextProps>`
  font-family: 'NunitoMedium';
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;