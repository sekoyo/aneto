const styles = new Map<string, HTMLStyleElement>();

export function addStyle(uid: string, rules: string) {
  if (typeof document === 'undefined' || styles.get(uid)) {
    return;
  }

  const style = document.createElement('style');
  style.innerHTML = rules;
  style.setAttribute('id', uid);
  document.head.appendChild(style);
  styles.set(uid, style);
}

// It's too difficult to determine when to remove styles in the case
// of multiple components and doesn't really matter if the style hangs
// around. So changing hook to a facade to not break compatibility.
export const useStyle = addStyle;

if ((module as any).hot) {
  (module as any).hot.dispose(() => {
    styles.forEach(style => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    });
    styles.clear();
  });
}
