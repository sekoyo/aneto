# Aneto

A simple, dependency-free, ~823 byte (min), zero cost CSS-in-JS solution for React.

Aneto is perfect if:

- You want a CSS-in-JS solution for convenience (no CSS import) and/or co-locating your CSS.
- You're OK with writing vanilla CSS with no nesting, auto vendor prefixing etc.
- You're OK with non-hashed classes and instead applying a convention like BEM, which could arguably be better for users of your components.
- You want something with the same performance profile as vanilla CSS.
- You want something that barely adds any size to your bundle.
- You want something that doesn't require any special build tooling.

## Usage

Your app or top level component:

```js
import * as React from 'react';
import { useTheme, useStyle, css } from 'aneto';

const defaultTheme = {
  buttonBg: 'red',
  buttonPadding: '10px',
  buttonPaddingSmall: '5px',
};

export function App({ theme = defaultTheme }) {
  useTheme('xx', theme);
  useStyle(componentStyles);

  return (
    <div className="xx-app">
      <Button size="small">Some button</Button>
    </div>
  );
}

const componentStyles = css`
  .xx-app {
    height: 100%;
    font-family: sans-serif;
  }
`;
```

A sub level component:

```js
import * as React from 'react';
import { useStyle, css } from 'aneto';

export function Button({ size = 'normal', children, ...attrs }) {
  useStyle(componentStyles);

  return (
    <button className={`xx-button xx-button--${size}`} {...attrs}>
      {children}
    </button>
  );
}

const componentStyles = css`
  .xx-button {
    background: var(--xx-buttonBg);
    padding: var(--xx-buttonPadding);
  }
  .xx-button--small {
    padding: var(--xx-buttonPaddingSmall);
  }
`;
```

## CSS syntax highlighting

The sole purpose of the `css` tagged template literal is to provide the same syntax highlighting as can be used with Emotion and Syled Components: https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components
