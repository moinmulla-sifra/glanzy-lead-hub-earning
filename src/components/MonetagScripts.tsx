import { useEffect } from 'react';

export function MonetagScripts() {
  useEffect(() => {
    // Flag to ensure scripts are only injected once
    if (window.__MONETAG_INJECTED__) return;
    window.__MONETAG_INJECTED__ = true;

    // 1. Multitag script
    const script1 = document.createElement('script');
    script1.src = 'https://quge5.com/88/tag.min.js';
    script1.setAttribute('data-zone', '278481');
    script1.async = true;
    script1.setAttribute('data-cfasync', 'false');
    document.head.appendChild(script1);

    // 2. In-Page Push script
    const script2 = document.createElement('script');
    script2.innerHTML = `(function(s){s.dataset.zone='11765692',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
    document.head.appendChild(script2);

    // 3. Vignette script
    const script3 = document.createElement('script');
    script3.innerHTML = `(function(s){s.dataset.zone='11765757',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;
    document.head.appendChild(script3);

    return () => {
      // Optional: Cleanup if needed, but ads are usually kept for the session.
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    __MONETAG_INJECTED__?: boolean;
  }
}
