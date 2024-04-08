import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Button = styled.Pressable<{ color: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 128px;
  min-height: 28px;
  border: 1px solid ${({ color }) => color};
  border-radius: 5px;
`;

export const SwitchButtonBackground = styled(Animated.View)<{ color: string, isOpen: boolean }>`
  position: absolute;
  width: 50%;
  height: 100%;
  left: -.1px;
  background-color: ${({ color }) => color};
  border-top-left-radius: ${({ isOpen }) => !isOpen ? `4px` : '0px'};
  border-top-right-radius: ${({ isOpen }) => isOpen ? `4px` : '0px'};
  border-bottom-left-radius: ${({ isOpen }) => !isOpen ? `4px` : '0px'};
  border-bottom-right-radius: ${({ isOpen }) => isOpen ? `4px` : '0px'};
`;

export const SwitchButtonText = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  padding: 3px 0;
`;