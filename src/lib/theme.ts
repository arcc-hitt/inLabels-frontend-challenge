// src/lib/theme.ts
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark' | 'system';
const stored = localStorage.getItem('theme') as Theme | null;

// start with stored value or default to system
export const theme = writable<Theme>(stored ?? 'system');

// helper to apply a theme to <html>
function applyTheme(mode: Theme) {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('dark');
  } else if (mode === 'light') {
    root.classList.remove('dark');
  } else {
    // system: remove class, then let media query take over
    root.classList.remove('dark');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    }
  }
}

// subscribe to changes
theme.subscribe((mode) => {
  applyTheme(mode);
  localStorage.setItem('theme', mode);
});

// listen for system changes when in “system” mode
if (window.matchMedia) {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const m = localStorage.getItem('theme') as Theme;
      if (m === 'system') {
        // re-apply so class toggles with system
        applyTheme('system');
      }
    });
}
