import { useEffect, useRef, useState } from 'react';
import Foto from './shared/Foto.jsx';

// Galeria de um quarto num <dialog> modal: o browser trata do foco, do Esc e do resto da página
// inerte. Setas ← →, miniaturas, contador, e deslizar no telemóvel.
export default function Galeria({ titulo, fotos, inicio = 0, aoFechar }) {
  const ref = useRef(null);
  const toque = useRef(null);
  const [i, setI] = useState(inicio);
  const n = fotos.length;
  const ir = (d) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    const dlg = ref.current;
    dlg.showModal();
    const teclas = (e) => {
      if (e.key === 'ArrowRight') ir(1);
      if (e.key === 'ArrowLeft') ir(-1);
    };
    dlg.addEventListener('keydown', teclas);
    return () => dlg.removeEventListener('keydown', teclas);
  }, []);

  // a miniatura ativa fica sempre à vista
  useEffect(() => {
    ref.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [i]);

  return (
    <dialog
      ref={ref}
      className="galeria"
      aria-label={`Fotografias: ${titulo}`}
      onClose={aoFechar}
      onClick={(e) => e.target === e.currentTarget && ref.current.close()}
    >
      <div className="galeria__caixa">
        <header className="galeria__topo">
          <h3>{titulo}</h3>
          <span className="galeria__conta" aria-live="polite">{i + 1} / {n}</span>
          <button type="button" className="galeria__fechar" onClick={() => ref.current.close()} aria-label="Fechar">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </header>

        <figure
          className="galeria__palco"
          onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - (toque.current ?? 0);
            if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
          }}
        >
          <Foto key={fotos[i]} nome={fotos[i]} sizes="(min-width: 900px) 60vw, 100vw" prioridade className="galeria__foto" />
          <button type="button" className="galeria__seta galeria__seta--esq" onClick={() => ir(-1)} aria-label="Fotografia anterior">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="galeria__seta galeria__seta--dir" onClick={() => ir(1)} aria-label="Fotografia seguinte">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </figure>

        <ul className="galeria__miniaturas" aria-label="Todas as fotografias">
          {fotos.map((f, k) => (
            <li key={f}>
              <button type="button" aria-current={k === i ? 'true' : undefined} onClick={() => setI(k)} aria-label={`Fotografia ${k + 1} de ${n}`}>
                <Foto nome={f} sizes="96px" alt="" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
