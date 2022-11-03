import { useCallback, useEffect, useRef } from 'react';

const useIsMounted = (): (() => boolean) => {
  const mountedRef = useRef<boolean>(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
};

export default useIsMounted;
