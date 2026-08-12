// src/hooks/useMemoizedValue.ts
import { useMemo, useRef } from 'react';

export function useMemoizedValue<T>(value: T): T {
  const ref = useRef<T>(value);

  return useMemo(() => {
    ref.current = value;
    return ref.current;
  }, [value]);
}
