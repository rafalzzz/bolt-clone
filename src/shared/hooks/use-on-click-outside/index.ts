import { useEffect, type RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <RefType extends RefObject<HTMLElement> | RefObject<HTMLElement>[]>(
  refs: RefType,
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const refArray = Array.isArray(refs) ? refs : [refs];

      const isClickInsideElement = refArray.some((ref) =>
        ref.current?.contains(event.target as Node),
      );

      if (isClickInsideElement) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
};

export default useOnClickOutside;
