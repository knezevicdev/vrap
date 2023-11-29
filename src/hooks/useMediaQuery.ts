import { useEffect, useState } from 'react';

const mediaSizes = {
  mobile: '(max-width: 599px)',
  tablet: '(min-width: 600px) and (max-width: 959px)',
  desktop: '(min-width: 960px)',
};

type MediaSize = keyof typeof mediaSizes;

function useMediaQuery(size: MediaSize): boolean {
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    const mediaQuery = mediaSizes[size];

    // If window is not defined (i.e. on the server), always set matches to false
    if (typeof window === 'undefined') {
      setIsMatching(false);
      return;
    }

    const media = window.matchMedia(mediaQuery);
    setIsMatching(media.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsMatching(e.matches);
    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, [size]);

  return isMatching;
}

export default useMediaQuery;
