import { useEffect, useRef, useState } from "react";

export const useThrottle = <T>(value: T, delay = 500) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted.current;

    if (timeSinceLastExecution >= delay) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      const handler: NodeJS.Timeout = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, delay - timeSinceLastExecution);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay]);

  return throttledValue;
};
