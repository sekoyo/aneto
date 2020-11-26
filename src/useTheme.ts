import { useLayoutEffect } from 'react';

type AnyTheme = Record<string, string>;

function makeCssTheme<T = AnyTheme>(prefix: string, theme: T) {
  return Object.keys(theme).reduce((acc, key) => {
    const value = theme[key as keyof T];
    if (value) {
      return acc + `${`--${prefix}-${key}`}: ${value};\n`;
    }
    return acc;
  }, '');
}

export function useTheme<T = AnyTheme>(prefix: string, theme: T, selector = ':root') {
  useLayoutEffect(() => {
    const style = document.createElement('style');
    const cssTheme = makeCssTheme(prefix, theme);

    style.setAttribute('id', `${prefix}-theme`);
    style.setAttribute('data-selector', selector);
    style.innerHTML = `
        ${selector} {
          ${cssTheme}
        }
      `;

    document.head.appendChild(style);

    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [prefix, theme, selector]);
}
