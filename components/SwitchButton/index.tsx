import { FC, memo, useMemo } from 'react';
import { Button, SwitchButtonBackground, SwitchButtonText } from './styles';
import { PrimaryText } from '../../components/PrimaryText';
import { useTheme } from '../../hooks/useTheme';
import { useAnimatedSwitch } from '../../hooks/useAnimatedSwitch';

interface SwitchButtonType {
  title: string;
  color: string;
}

type Props = {
  isToggled: boolean;
  onPress: () => void;
  defaultTitle: string;
  activeTitle: string;
}

export const SwitchButton: FC<Props> = memo(({
  isToggled,
  onPress,
  defaultTitle,
  activeTitle,
}) => {
  const { theme: { colors } } = useTheme();
  const buttonColor = colors.activeColor;
  const switchTextTypes: SwitchButtonType[] = useMemo(() => ([
    { title: defaultTitle, color: isToggled ? buttonColor : colors.elementsColor },
    { title: activeTitle, color: !isToggled ? buttonColor : colors.elementsColor },
  ]), [defaultTitle, activeTitle, isToggled, buttonColor]);
  const animatedStyle = useAnimatedSwitch(isToggled);

  return (
    <Button color={buttonColor} onPress={onPress}>
      <SwitchButtonBackground
        style={animatedStyle}
        color={buttonColor}
        isOpen={isToggled}
      />

      {switchTextTypes.map(({ title, color }: SwitchButtonType) => (
        <SwitchButtonText color={color} key={title}>
          {title}
        </SwitchButtonText>
      ))}
    </Button>
  );
});