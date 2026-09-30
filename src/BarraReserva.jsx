import { useId, useState } from 'react';
import { linkBooking, IconeSeta } from './shared/Reserva.jsx';
import { CONFIG } from './shared/data.js';

// Barra de reserva em pílula branca (estilo da referência): datas e pessoas seguem para o
// Booking com as datas no link. Não mostra preços nem disponibilidade: isso é do Booking.

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const paraData = (s) => {
  const [a, m, d] = s.split('-').map(Number);
  return new Date(a, m - 1, d);
};
const maisUm = (s) => {
  const d = paraData(s);
  d.setDate(d.getDate() + 1);
  return iso(d);
};
const curto = new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'short' });

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CampoData({ id, rotulo, valor, min, onChange }) {
  return (
    <div className="br__campo">
      <label htmlFor={id} className="br__rotulo">{rotulo}</label>
      <span className="br__valor" aria-hidden="true">
        {valor ? curto.format(paraData(valor)) : 'Escolher data'} <Chevron />
      </span>
      <input
        id={id}
        className="br__nativo"
        type="date"
        value={valor}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker?.()}
      />
    </div>
  );
}

export default function BarraReserva({ id, className = '' }) {
  const uid = useId();
  const [chegada, setChegada] = useState('');
  const [partida, setPartida] = useState('');
  const [pessoas, setPessoas] = useState(2);
  const hoje = iso(new Date());

  const escolherChegada = (v) => {
    setChegada(v);
    if (v && (!partida || partida <= v)) setPartida(maisUm(v));
  };
  const noites = chegada && partida ? Math.round((paraData(partida) - paraData(chegada)) / 864e5) : 0;

  return (
    <form id={id} className={`br ${className}`} aria-label="Ver disponibilidade" onSubmit={(e) => e.preventDefault()}>
      <CampoData id={`${uid}-c`} rotulo="Chegada" valor={chegada} min={hoje} onChange={escolherChegada} />
      <CampoData id={`${uid}-p`} rotulo="Partida" valor={partida} min={chegada ? maisUm(chegada) : hoje} onChange={setPartida} />
      <div className="br__campo br__campo--pessoas">
        <span className="br__rotulo" id={`${uid}-n`}>Pessoas</span>
        <div className="br__contador" role="group" aria-labelledby={`${uid}-n`}>
          <button type="button" onClick={() => setPessoas((n) => Math.max(1, n - 1))} disabled={pessoas <= 1} aria-label="Menos uma pessoa">−</button>
          <output aria-live="polite">{pessoas} {pessoas === 1 ? 'adulto' : 'adultos'}</output>
          <button type="button" onClick={() => setPessoas((n) => Math.min(CONFIG.maxPessoas, n + 1))} disabled={pessoas >= CONFIG.maxPessoas} aria-label="Mais uma pessoa">+</button>
        </div>
      </div>
      <a className="br__botao" href={linkBooking({ chegada, partida, pessoas })} target="_blank" rel="noopener">
        <span>{noites ? `${noites} ${noites === 1 ? 'noite' : 'noites'} · Booking` : 'Ver disponibilidade'}</span>
        <IconeSeta />
      </a>
    </form>
  );
}
