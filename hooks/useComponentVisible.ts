import { useState, useEffect, useRef } from 'react';

export const useComponentVisible = (initialIsVisible, btnRef) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const [clicked, setClicked] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target) && !btnRef.current?.contains(event.target)) {
      setIsComponentVisible(false);
    } else {
      setIsComponentVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible, clicked, setClicked };
};
