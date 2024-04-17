import { FC, memo } from 'react';
import { View } from 'react-native';
import { DetailedInfoContainer, ContainerList, DetailedInfoSmallContainer, DaylightContainer, DaylightGradient, DaylightPointPosition, SunContainer, TemperatureText } from './styles';
import { SecondaryText } from '../../../components/SecondaryText';
import { PrimaryText } from '../../../components/PrimaryText';
import { useTheme } from '../../../hooks/useTheme';
import SunIcon from '../../../assets/static/sunnyIcon.svg';
import Temperature from '../../../assets/static/temperature.svg';
import { TemperatureContainer } from '../styles';
import { WeatherDetailsInfo } from '../../../components/WeatherDetailsInfo';

interface WeatherDetail {
  type: string;
  description: string;
}

interface Props {
  isNight: boolean;
  sunPosition: number;
  daylightDetails: WeatherDetail[];
  temperatureDetails: WeatherDetail[];
  forecastDetails: WeatherDetail[];
  animatedStyle: { height: number };
}

export const WeatherDetails: FC<Props> = memo(({ isNight, sunPosition, daylightDetails, temperatureDetails, forecastDetails, animatedStyle }) => {
  const { theme: { colors } } = useTheme();
  const currentSunPosition = sunPosition <= 10 ? 10 : (sunPosition > 158 ? 158 : sunPosition);
  const [minTemp, maxTemp] = temperatureDetails[1]?.description.split(' ');
  const daylightColor = isNight ? colors.accentColor : colors.daylightColor;

  return (
    <ContainerList style={[animatedStyle]}>
      <View style={{ display: 'flex', flexDirection: 'row', height: 100 }}>
        <WeatherDetailsInfo details={daylightDetails[0]} size={'25%'} />
        <WeatherDetailsInfo details={daylightDetails[1]} size={'50%'}>
          <DaylightContainer borderColor={daylightColor}>
            {!isNight && (
              <DaylightGradient colors={colors.daylightColors} locations={[0, 1]} start={{ x: 0.5, y: 0.5 }} />
            )}
            <DaylightPointPosition bgColor={daylightColor} style={{ left: -5 }} />
            <DaylightPointPosition bgColor={daylightColor} style={{ right: -6 }} />
            {!isNight && (
              <SunContainer style={{ transform: [{ rotate: `${currentSunPosition}deg` }]}}>
                <SunIcon
                  style={{ position: 'absolute', left: 3, bottom: '50%', maxWidth: 18, maxHeight: 18, borderRadius: 9999 }}
                />
              </SunContainer>
            )}
          </DaylightContainer>
        </WeatherDetailsInfo>
        <WeatherDetailsInfo details={daylightDetails[2]} size={'25%'} />
      </View>

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <WeatherDetailsInfo details={temperatureDetails[0]} size={'25%'} />
        <WeatherDetailsInfo details={{ type: temperatureDetails[1].type, description: '' }} size={'50%'}>
          <TemperatureContainer>
            <TemperatureText color={colors.green}>{minTemp}</TemperatureText>
            <Temperature style={{ minWidth: 86, minHeight: 18 }} />
            <TemperatureText color={colors.red}>{maxTemp}</TemperatureText>
          </TemperatureContainer>
        </WeatherDetailsInfo>
        <WeatherDetailsInfo details={temperatureDetails[2]} size={'25%'} />
      </View>

      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <WeatherDetailsInfo details={forecastDetails[0]} size={'25%'} />
        <WeatherDetailsInfo details={forecastDetails[1]} size={'50%'} />
        <WeatherDetailsInfo details={forecastDetails[2]} size={'25%'} />
      </View>
    </ContainerList>
  );
});