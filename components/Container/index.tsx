import { FC, ReactNode } from 'react';
import { Container as Wrapper } from './styles';

type Props = {
  children: ReactNode;
  style?: object;
  otherProps?: any;
}

export const Container: FC<Props> = ({ children, style, ...otherProps }): JSX.Element => {
  return (
    <Wrapper style={style} {...otherProps}>{children}</Wrapper>
  );
};