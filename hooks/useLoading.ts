import { useState, useEffect } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return { isLoading, setIsLoading };
};
