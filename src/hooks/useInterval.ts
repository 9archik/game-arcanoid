import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();

  // Запоминаем обратный вызов при каждом рендере
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Устанавливаем интервал
  useEffect(() => {
    let id: NodeJS.Timeout | null = null;

    if (delay !== null) {
      id = setInterval(() => {
        savedCallback.current?.();
      }, delay);
    }

    return () => clearInterval(id!);
  }, [delay]);
}
