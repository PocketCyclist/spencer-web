import { useEffect, useState } from 'react';

const getMatchQueryMatches = (query: string): boolean => {
  return typeof window !== 'undefined' && window.matchMedia(query).matches;
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(() =>
    getMatchQueryMatches(query)
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMediaQueryChange = () => {
      setMatches(getMatchQueryMatches(query));
    };

    handleMediaQueryChange();

    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return () =>
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
  }, [query]);

  return matches;
};
