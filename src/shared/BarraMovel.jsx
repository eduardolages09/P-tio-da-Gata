import { useEffect, useState } from 'react';
import { IconeSeta } from './Reserva.jsx';

// Em ecrãs pequenos, quando a faixa de reserva do hero sai do ecrã, aparece uma barra
// fixa que leva à faixa de reserva do fim da página.
export default function BarraMovel({ alvoTopo = 'reserva-topo', alvoFim = 'reserva', className = '' }) {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const topo = document.getElementById(alvoTopo);
    const fim = document.getElementById(alvoFim);
    if (!topo || !fim || !('IntersectionObserver' in window)) return;
    // só aparece depois de a faixa do topo ter ficado para trás (acima do ecrã)
    const estado = { passouTopo: false, fim: false };
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.target === topo) estado.passouTopo = !e.isIntersecting && e.boundingClientRect.top < 0;
        else estado.fim = e.isIntersecting;
      }
      setVisivel(estado.passouTopo && !estado.fim);
    });
    io.observe(topo);
    io.observe(fim);
    return () => io.disconnect();
  }, [alvoTopo, alvoFim]);
  return (
    <a href={`#${alvoFim}`} className={`barra-movel ${visivel ? 'is-on' : ''} ${className}`} aria-hidden={!visivel} tabIndex={visivel ? 0 : -1}>
      <span>Ver disponibilidade</span>
      <IconeSeta />
    </a>
  );
}
