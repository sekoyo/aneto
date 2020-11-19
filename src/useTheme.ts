import { useEffect } from 'react';

const themes = new Map<string, boolean>();

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

export function addTheme<T = AnyTheme>(prefix: string, theme: T, selector = ':root') {
  if (themes.get(prefix + selector) || typeof document === 'undefined') {
    return;
  }

  let style: HTMLStyleElement;

  style = document.createElement('style');
  const cssTheme = makeCssTheme(prefix, theme);

  style.setAttribute('id', `${prefix}-theme`);
  style.setAttribute('data-selector', selector);
  style.innerHTML = `
      ${selector} {
        ${cssTheme}
      }
    `;

  document.head.appendChild(style);
  themes.set(prefix + selector, true);
}

export function useTheme<T = AnyTheme>(prefix: string, theme: T, selector = ':root') {
  // Add immediately rather than wait for first render in a useEffect.
  addTheme(prefix, theme, selector);

  useEffect(
    () => () => {
      const styleEl = document.head.querySelector(
        `#${prefix}-theme[data-selector="${selector}"]`
      );
      if (styleEl) {
        document.head.removeChild(styleEl);
        themes.delete(prefix + selector);
      }
    },
    [prefix, selector]
  );
}
