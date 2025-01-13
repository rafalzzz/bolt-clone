import { useRef, useEffect, useCallback } from 'react';

type TUseCustomModal = {
  isVisible: boolean;
};

const useCustomModal = ({ isVisible }: TUseCustomModal) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const fadeInEffect = useCallback(() => {
    if (!modalRef.current) {
      return;
    }

    let val = parseFloat(modalRef.current.style.opacity);

    if (!((val += 0.2) > 1)) {
      modalRef.current.style.opacity = String(val);
      requestAnimationFrame(fadeInEffect);
    }
  }, []);

  const fadeOutEffect = useCallback(() => {
    if (!modalRef.current) {
      return;
    }

    const currentOpacity = parseFloat(modalRef.current.style.opacity);
    const newOpacity = currentOpacity - 0.1;

    if (newOpacity <= 0) {
      modalRef.current.style.display = 'none';
    } else {
      modalRef.current.style.opacity = newOpacity.toString();
      requestAnimationFrame(fadeOutEffect);
    }
  }, []);

  useEffect(() => {
    const element = modalRef.current;

    if (!element) {
      return;
    }

    if (isVisible) {
      element.style.opacity = '0';
      element.style.display = 'flex';

      fadeInEffect();
    } else {
      element.style.opacity = '1';

      fadeOutEffect();
    }
  }, [isVisible, fadeInEffect, fadeOutEffect]);

  return { modalRef };
};

export default useCustomModal;
