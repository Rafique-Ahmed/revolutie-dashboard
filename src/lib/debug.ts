// src/lib/debug.ts
const isDev = import.meta.env.DEV;

type DebugFunction = (...args: unknown[]) => void;

export const debug = {
  log: ((...args: unknown[]) => {
    if (isDev) {
      console.warn('🔍 [LOG]:', ...args);
    }
  }) as DebugFunction,
  error: ((...args: unknown[]) => {
    if (isDev) {
      console.error(...args);
    }
  }) as DebugFunction,
  warn: ((...args: unknown[]) => {
    if (isDev) {
      console.warn(...args);
    }
  }) as DebugFunction,
  info: ((...args: unknown[]) => {
    if (isDev) {
      console.warn('ℹ️ [INFO]:', ...args);
    }
  }) as DebugFunction,
};
