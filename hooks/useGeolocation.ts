import { useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

type Callback = (item: Location.LocationGeocodedAddress) => void;


export const useGeolocation = (callback: Callback): {
  isGeolocationLoading: boolean,
  isGeolocationError: boolean,
  isGrantedPermission: boolean,
  getGeolocation: () => void,
} => {
  const [isGeolocationLoading, setGeolocationLoading] = useState<boolean>(false);
  const [isGeolocationError, setGeolocationError] = useState<boolean>(false);
  const [isGrantedPermission, setGrantedPermission] = useState<boolean>(true);
  const getGeolocation = async () => {
    try {
      setGeolocationLoading(true);
      setGeolocationError(false);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission not granted',
          'Allow the app to use location service.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        setGrantedPermission(false);
      };

      let { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
        setGrantedPermission(true);
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });
  
        response.forEach(callback)
      };
    } catch {
      Alert.alert(
        'Can`t load your current geoloation',
        'Try load again.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      setGeolocationError(true);
    } finally {
      setGeolocationLoading(false);
    }
  };

  return { 
    isGeolocationLoading: isGeolocationLoading, 
    isGeolocationError: isGeolocationError,
    isGrantedPermission: isGrantedPermission,
    getGeolocation: getGeolocation,
  };
};