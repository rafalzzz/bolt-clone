import { useState, useEffect, useRef } from 'react';

type TUseWindowSize = {
  maxWidth?: number;
  maxHeight?: number;
};

type TWindowSize = {
  width: number;
  height: number;
};

const DEBOUNCE_TIME = 200;

const useWindowSize = ({ maxWidth, maxHeight }: TUseWindowSize = {}): TWindowSize => {
  const [windowSize, setWindowSize] = useState<TWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = maxWidth ? Math.min(window.innerWidth, maxWidth) : window.innerWidth;
      const newHeight = maxHeight ? Math.min(window.innerHeight, maxHeight) : window.innerHeight;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setWindowSize({ width: newWidth, height: newHeight });
      }, DEBOUNCE_TIME);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      window.removeEventListener('resize', handleResize);
    };
  }, [maxWidth, maxHeight]);

  return windowSize;
};

export default useWindowSize;
