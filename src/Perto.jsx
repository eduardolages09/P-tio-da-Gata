import { useEffect, useRef, useState } from 'react';
import Foto from './shared/Foto.jsx';
import { LOCAIS } from './shared/data.js';
import fotos from './shared/fotos.json';

// Os cartões são altos: uma foto larga é cortada dos lados e desenhada pela altura do cartão, por isso precisa de
// uma versão mais larga do que o próprio cartão. Altura do cartão ≈ 1,8 larguras no computador (4 lado a lado),
// ≈ 1,3 no tablet (2×2) e ≈ 1,2 no telemóvel.
const SIZES = (f) => {
  const r = f.w / f.h;
  const vw = (base, alto) => `${Math.round(base * Math.max(1, Math.min(3, r * alto)))}vw`;
  // telemóveis de densidade 3: pede-se a foto para 2× (a diferença não se vê e poupa metade dos bytes)
  return `(min-width: 1100px) ${vw(25, 1.8)}, (min-width: 560px) ${vw(50, 1.3)}, (min-resolution: 2.5dppx) ${vw(67, 1.2)}, ${vw(100, 1.2)}`;
};

// "Por perto": os 4 locais lado a lado, a ocupar o ecrã (2×2 no tablet, em coluna no telemóvel).
// Os cartões entram uma vez, quando a secção aparece.

export default function Perto({ cabecalho }) {
  const secao = useRef(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisto(true); io.disconnect(); }
    }, { rootMargin: '0px 0px -20% 0px' });
    io.observe(secao.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`perto ${visto ? 'is-visto' : ''}`} id="alta" aria-labelledby="t-alta" ref={secao}>
      <div className="perto__topo">{cabecalho}</div>
      <ol className="perto__grelha" aria-label="Locais a visitar a pé">
        {LOCAIS.map((l, i) => (
          <li key={l.nome} className="local" data-paralaxe="6" style={{ '--i': i }}>
            <Foto nome={l.foto} sizes={SIZES(fotos[l.foto])} className="local__foto" style={l.pos ? { objectPosition: l.pos } : undefined} />
            <span className="local__dist">{l.dist} a pé</span>
            <div className="local__texto">
              <h3>{l.nome}</h3>
              <p>{l.texto}</p>
              {l.credito ? (
                <p className="local__credito">
                  Foto: <a href={l.credito.url} target="_blank" rel="noopener">{l.credito.autor}</a>{l.credito.lic ? `, ${l.credito.lic}` : null}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
