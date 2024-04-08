import { FC, createContext } from 'react';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

interface LocationsContext {
  currentLocation: number | null;
  locations: number[];
  setCurrentLocation: React.Dispatch<React.SetStateAction<number | null>>;
  setLocations: React.Dispatch<React.SetStateAction<number[]>>;
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
  const [currentLocation, setCurrentLocation] = useAsyncStorage<number | null>('currentLocation', null);
  const [locations, setLocations] = useAsyncStorage<number[]>('locations', []);

  return (
    <LocationsContext.Provider value={{ currentLocation, locations, setCurrentLocation, setLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};