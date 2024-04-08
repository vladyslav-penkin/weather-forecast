import styled from 'styled-components/native';

export const WeatherContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const WeatherInfo = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const WeatherImageContainer = styled.View`
  position: relative;
  display: flex;
  flex-basis: 50%;
  align-items: center;
  justify-content: center;
`;

export const WeatherImage = styled.Image`
  min-width: 100%;
  min-height: 100%;
`;

export const WeatherInfoContainer = styled.View`
  display: flex;
  flex-basis: 50%;
`;

export const TemperatureContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;