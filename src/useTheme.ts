import { useEffect } from 'react';

function makeCssTheme<T = Record<string, string>>(prefix: string, theme: T) {
  return Object.keys(theme).reduce((acc, key) => {
    const value = theme[key as keyof T];
    if (value) {
      return acc + `${`--${prefix}-${key}`}: ${value};\n`;
    }
    return acc;
  }, '');
}

export function useTheme<T = Record<string, string>>(
  prefix: string,
  theme: T,
  selector = ':root'
) {
  useEffect(() => {
    let style: HTMLStyleElement;

    if (theme) {
      style = document.createElement('style');
      const cssTheme = makeCssTheme(prefix, theme);

      style.setAttribute('id', `${prefix}-theme`);
      style.innerHTML = `
        ${selector} {
          ${cssTheme}
        }
      `;

      document.head.appendChild(style);
    }

    return () => {
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [theme]);
}
