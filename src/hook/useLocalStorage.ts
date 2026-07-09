import { useCallback, useState } from "react";

type SetValue<T> = T | ((previousValue: T) => T);

function readLocalStorageValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item === null ? initialValue : (JSON.parse(item) as T);
  } catch (error) {
    console.error(`Failed to read localStorage key "${key}"`, error);
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readLocalStorageValue(key, initialValue),
  );

  const setValue = useCallback((value: SetValue<T>) => {
    try {
      setStoredValue(previousValue => {
        const valueToStore =
          value instanceof Function ? value(previousValue) : value;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.error(`Failed to set localStorage key "${key}"`, error);
    }
  }, [key]);

  return [storedValue, setValue] as const;
}
