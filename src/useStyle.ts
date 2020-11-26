import { useLayoutEffect } from 'react';

const styles = new Map<string, HTMLStyleElement>();

export function useStyle(uid: string, rules: string) {
  useLayoutEffect(() => {
    if (styles.get(uid)) {
      return;
    }

    const style = document.createElement('style');
    style.innerHTML = rules;
    style.setAttribute('id', uid);
    document.head.appendChild(style);
    styles.set(uid, style);

    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
        styles.delete(uid);
      }
    };
  }, [uid, rules]);
}
