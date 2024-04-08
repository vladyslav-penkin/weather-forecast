import { FC, memo } from 'react';
import { WeatherDetailsInfoContainer } from './styles';
import { PrimaryText } from '../../components/PrimaryText';
import { SecondaryText } from '../../components/SecondaryText';

interface Props {
  details: { type: string, description: string };
  size: string;
  children?: React.ReactNode;
}

export const WeatherDetailsInfo: FC<Props> = memo(({ details: { type, description }, children, size }) => {
  return (
    <WeatherDetailsInfoContainer size={size}>
      <SecondaryText title={type} size={12} />
      {description && <PrimaryText title={description} size={16} />}
      {children}
    </WeatherDetailsInfoContainer>
  );
});