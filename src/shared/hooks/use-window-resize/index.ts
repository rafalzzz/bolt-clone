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

const getDimensionValue = (currentValue: number, maxValue?: number) =>
  maxValue ? Math.min(currentValue, maxValue) : currentValue;

const useWindowSize = ({ maxWidth, maxHeight }: TUseWindowSize = {}): TWindowSize => {
  const [windowSize, setWindowSize] = useState<TWindowSize>({
    width: getDimensionValue(window.innerWidth, maxWidth),
    height: getDimensionValue(window.innerHeight, maxHeight),
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = getDimensionValue(window.innerWidth, maxWidth);
      const newHeight = getDimensionValue(window.innerHeight, maxHeight);

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
