import { useEffect, useRef, useState } from 'react';

// Dois gatos desenhados que entram a andar pela esquerda do ecrã e param em cima do cartão dos gatos.
// A distância de cada um é medida (da borda do ecrã até ao lugar onde para) e o passo acompanha-a:
// o número de passos é inteiro, por isso as patas param sempre direitas. Com "reduzir movimento" já lá estão.

const PASSO = 0.6; // segundos por passada completa
const VELOCIDADE = 130; // px por segundo

function Gato() {
  return (
    <svg viewBox="0 0 140 80" aria-hidden="true" focusable="false">
      <path className="gato__cauda" d="M37 38C23 36 15 25 19 11c2-6 8-6 7 0-2 11 3 18 13 21" />
      {/* patas do lado de lá (mais claras) e do lado de cá; cada par diagonal anda junto */}
      <rect className="gato__pata gato__pata--a gato__pata--longe" x="47" y="44" width="7" height="33" rx="3.5" />
      <rect className="gato__pata gato__pata--b gato__pata--longe" x="90" y="44" width="7" height="33" rx="3.5" />
      <path className="gato__corpo" d="M34 40c0-10 10-13 24-13h30c11 0 18 4 21 9l-4 12c-3 4-8 5-15 5H45c-7 0-11-5-11-13z" />
      <rect className="gato__pata gato__pata--b" x="38" y="44" width="7.5" height="33" rx="3.75" />
      <rect className="gato__pata gato__pata--a" x="82" y="44" width="7.5" height="33" rx="3.75" />
      <g className="gato__cabeca">
        <path d="M100 19l3-13 9 10h6l9-10 2 14c3 4 3 11 0 15-3 5-9 7-15 7-7 0-13-3-15-8-2-5-1-11 1-15z" />
        <circle className="gato__olho" cx="120" cy="25" r="1.6" />
      </g>
    </svg>
  );
}

export default function Gatos() {
  const ref = useRef(null);
  const [estado, setEstado] = useState('fora'); // fora → a-entrar → (fica)

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setEstado('dentro'); return; }
    // distância até ao lugar final (sem contar com o transform) e duração com um número inteiro de passos
    const medir = () => {
      const x0 = el.getBoundingClientRect().left;
      el.querySelectorAll('.gato').forEach((g) => {
        const dist = x0 + g.offsetLeft + g.offsetWidth + 24;
        const passos = Math.max(2, Math.round(dist / VELOCIDADE / PASSO));
        g.style.setProperty('--de', `${-dist}px`);
        g.style.setProperty('--passos', passos);
        g.style.setProperty('--dur', `${(passos * PASSO).toFixed(2)}s`);
      });
    };
    medir();
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      medir();
      setEstado('a-entrar');
      io.disconnect();
    }, { rootMargin: '0px 0px -30% 0px' });
    io.observe(el);
    window.addEventListener('resize', medir);
    return () => { io.disconnect(); window.removeEventListener('resize', medir); };
  }, []);

  return (
    <div className={`gatos__passeio is-${estado}`} ref={ref} aria-hidden="true">
      <span className="gato gato--1"><Gato /></span>
      <span className="gato gato--2"><Gato /></span>
    </div>
  );
}
