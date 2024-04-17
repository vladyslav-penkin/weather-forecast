import { FC, createContext } from 'react';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

type CurrentLocation = {
  id: number;
  lat: number;
  lon: number;
};

interface LocationsContext {
  currentLocation: CurrentLocation | null;
  locations: CurrentLocation[];
  setCurrentLocation: React.Dispatch<React.SetStateAction<CurrentLocation | null>>;
  setLocations: React.Dispatch<React.SetStateAction<CurrentLocation[]>>;
}

type Props = {
  children: React.ReactNode;
}

export const LocationsContext = createContext<LocationsContext>({
  currentLocation: null,
  locations: [],
  setCurrentLocation: () => {},
  setLocations: () => {},
});

export const LocationsProvider: FC<Props> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useAsyncStorage<CurrentLocation | null>('currentLocation', null);
  const [locations, setLocations] = useAsyncStorage<CurrentLocation[]>('locations', []);

  return (
    <LocationsContext.Provider value={{ currentLocation, locations, setCurrentLocation, setLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};