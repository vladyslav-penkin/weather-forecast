import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

// export const MoveToButtonContainer = styled.TouchableOpacity<{ borderColor: string }>`
//   margin-top: 16px;
//   margin-horizontal: 12px;
//   border-top-width: 1px;
//   border-style: solid;
//   border-color: ${({ borderColor }) => borderColor};
// `;

export const MoveToButtonContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding-vertical: 8px;
  justify-content: space-between;
  align-items: center;
`;

export const MoveToButtonInfo = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

export const MoveToButtonIconContainer = styled.View`
  position: relative;
  padding: 12px;
`;

export const MoveToButtonIcon = styled(LinearGradient)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 12px;
`;