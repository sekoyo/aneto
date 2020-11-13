import { useEffect, useRef } from 'react';

export function useStyle(rules: string) {
  const style = useRef<HTMLStyleElement | null>(null);

  useEffect(
    () => () => {
      if (style.current && document.head.contains(style.current)) {
        document.head.removeChild(style.current);
      }
      style.current = null;
    },
    []
  );

  // We don't do this in a useEffect as we want to insert the
  // style immediately not wait for the first render.
  if (!style.current) {
    style.current = document.createElement('style');
    style.current.innerHTML = rules;
    document.head.appendChild(style.current);
  }
}
