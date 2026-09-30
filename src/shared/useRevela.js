import { useEffect } from 'react';

// Revela elementos [data-revela] quando entram no ecrã (classe .is-in). Sem JS ou com
// prefers-reduced-motion o conteúdo fica visível: o CSS só esconde sob html.js.
export default function useRevela(margem = '0px 0px -12% 0px') {
  useEffect(() => {
    const els = document.querySelectorAll('[data-revela]:not(.is-in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: margem }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [margem]);
}
