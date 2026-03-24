import { useCallback, useEffect, useRef } from 'react';
import useSimStore from '../store/useSimStore';

export default function useLogQueue() {
  const setLog = useSimStore((s) => s.setLog);
  const timersRef = useRef([]);

  const clear = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  const queue = useCallback(
    (entries) => {
      clear();
      entries.forEach(({ delay, text }) => {
        const id = setTimeout(() => setLog(text), delay);
        timersRef.current.push(id);
      });
    },
    [clear, setLog]
  );

  useEffect(() => () => clear(), [clear]);

  return { queue, clear };
}
