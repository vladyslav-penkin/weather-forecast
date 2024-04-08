import styled from 'styled-components/native';

export const DayInfoButtonContainer = styled.Pressable<{ width: number, gap: number}>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 8px;
  padding: 9px 12px;
  width: ${({ width }) => `${width}px`};
  max-height: 56px;
  margin: ${({ gap }) => `0 ${gap}px 0 0`};
`;

export const DayInfoText = styled.Text<{ color: string, size?: string, weight?: string }>`
  font-family: 'NunitoMedium';
  color: ${({ color }) => color};
  font-size: ${({ size = '12' }) => `${size}px`};
  font-weight: ${({ weight = '500' }) => weight};
`;