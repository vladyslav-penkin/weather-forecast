import { FC } from 'react';
import { SettingsInfoContainer } from './styles';
import { PrimaryText } from '../../components/PrimaryText';

interface Props {
  children?: React.ReactNode;
  title: string;
}

export const SettingsInfo: FC<Props> = ({ children, title }) => {
  return (
    <SettingsInfoContainer>
      <PrimaryText title={title} size={16} />
      {children}
    </SettingsInfoContainer>
  );
};