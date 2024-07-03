import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    let id: number = 0;

    const tick = () => {
      savedCallback.current();
      if (id === 0) return; // Early exit if already unmounted
      id = window.requestAnimationFrame(tick);
    };

    id = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(id);
  }, [delay]);
};