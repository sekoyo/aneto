const styles = new Map<string, HTMLStyleElement>();

export function addStyle(name: string, rules: string) {
  if (styles.get(name)) {
    return;
  }
  const style = document.createElement('style');
  style.innerHTML = rules;
  style.setAttribute('id', name);
  document.head.appendChild(style);
  styles.set(name, style);
}

export function useStyle(name: string, rules: string) {
  addStyle(name, rules);
}

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
