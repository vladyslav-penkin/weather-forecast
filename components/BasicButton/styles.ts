import styled from 'styled-components/native';

interface ButtonProps {
  buttonWidth: string;
  buttonHeight: string;
  bgColor: string;
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
  background-color: ${({ bgColor }) => bgColor};
`;

export const ButtonText = styled.Text<TextProps>`
  font-family: 'NunitoMedium';
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;