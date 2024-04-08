import { useEffect, useState } from 'react';

type Callback = (value?: any) => void;

interface RequestResult {
  isLoading: boolean,
  isError: boolean,
};

export const useFetch = (
  tryFunc: Callback,
  catchFunc: Callback,
  finallyFunc: Callback,
  dependencies: unknown[],
  ): RequestResult  => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        await tryFunc?.();
      } catch {
        await catchFunc?.();
        setError(true);
      } finally {
        await finallyFunc?.();
        setLoading(false);
      }
    };
    
    fetchData();
  }, dependencies);

  return { isLoading, isError };
};