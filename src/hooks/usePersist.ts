import { useState, useEffect } from "react";

/* Useful to avoid hydration warning when using Zustand persist in Next js */
const usePersist = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default usePersist;
