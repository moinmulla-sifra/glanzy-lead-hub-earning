import { useEffect } from 'react';

export function MonetagScripts() {
  useEffect(() => {
    if (window.__MONETAG_INJECTED__) return;
    window.__MONETAG_INJECTED__ = true;

    // Multitag script
    const script1 = document.createElement('script');
    script1.src = 'https://quge5.com/88/tag.min.js';
    script1.setAttribute('data-zone', '278844');
    script1.async = true;
    script1.setAttribute('data-cfasync', 'false');
    document.head.appendChild(script1);

  }, []);

  return null;
}

declare global {
  interface Window {
    __MONETAG_INJECTED__?: boolean;
  }
}
