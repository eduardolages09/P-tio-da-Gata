import { useId, useState } from 'react';
import { CONFIG } from './data.js';
import './reserva.css';

// Faixa de reserva: datas e pessoas, que seguem para o Booking (com as datas no link) ou para
// o WhatsApp (mensagem já escrita). Não mostra preços nem disponibilidade: isso é do Booking.
// Estilo em reserva.css: por defeito sobre a fotografia do hero; .reserva--claro sobre fundo claro.

const hoje = () => {
  const d = new Date();
  return iso(d);
};
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
const curto = new Intl.DateTimeFormat('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' });
const longo = new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long' });

export function linkBooking({ chegada, partida, pessoas }) {
  if (!chegada || !partida) return CONFIG.bookingUrl;
  const p = new URLSearchParams({
    checkin: chegada,
    checkout: partida,
    group_adults: String(pessoas),
    group_children: '0',
    no_rooms: String(Math.ceil(pessoas / 2)),
    selected_currency: 'EUR',
  });
  return `${CONFIG.bookingUrl}?${p}`;
}

export function linkWhatsapp({ chegada, partida, pessoas }) {
  if (!CONFIG.whatsapp) return null;
  const quem = pessoas === 1 ? '1 pessoa' : `${pessoas} pessoas`;
  const texto =
    chegada && partida
      ? `Olá! Gostaria de saber se há disponibilidade no Pátio da Gata de ${longo.format(paraData(chegada))} a ${longo.format(paraData(partida))}, para ${quem}.`
      : 'Olá! Gostaria de saber a disponibilidade no Pátio da Gata.';
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
}

function CampoData({ id, rotulo, valor, min, onChange }) {
  return (
    <div className="reserva__campo">
      <label htmlFor={id} className="reserva__rotulo">{rotulo}</label>
      <span className="reserva__valor" aria-hidden="true">
        {valor ? curto.format(paraData(valor)) : 'Escolher'}
      </span>
      <input
        id={id}
        className="reserva__nativo"
        type="date"
        value={valor}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker?.()}
      />
    </div>
  );
}

export function IconeWhatsapp() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export function IconeSeta() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function Reserva({ className = '', titulo = 'Ver disponibilidade', whatsapp = true }) {
  const uid = useId();
  const [chegada, setChegada] = useState('');
  const [partida, setPartida] = useState('');
  const [pessoas, setPessoas] = useState(2);

  const escolherChegada = (v) => {
    setChegada(v);
    if (v && (!partida || partida <= v)) setPartida(maisUm(v));
  };
  const noites = chegada && partida ? Math.round((paraData(partida) - paraData(chegada)) / 864e5) : 0;
  const estado = { chegada, partida, pessoas };
  const wa = linkWhatsapp(estado);

  return (
    <form className={`reserva ${className}`} aria-label={titulo} onSubmit={(e) => e.preventDefault()}>
      <CampoData id={`${uid}-c`} rotulo="Chegada" valor={chegada} min={hoje()} onChange={escolherChegada} />
      <CampoData id={`${uid}-p`} rotulo="Partida" valor={partida} min={chegada ? maisUm(chegada) : hoje()} onChange={setPartida} />
      <div className="reserva__campo reserva__campo--pessoas">
        <span className="reserva__rotulo" id={`${uid}-n`}>Pessoas</span>
        <div className="reserva__contador" role="group" aria-labelledby={`${uid}-n`}>
          <button type="button" onClick={() => setPessoas((n) => Math.max(1, n - 1))} disabled={pessoas <= 1} aria-label="Menos uma pessoa">−</button>
          <output aria-live="polite">{pessoas}</output>
          <button type="button" onClick={() => setPessoas((n) => Math.min(CONFIG.maxPessoas, n + 1))} disabled={pessoas >= CONFIG.maxPessoas} aria-label="Mais uma pessoa">+</button>
        </div>
      </div>
      <a className="reserva__campo reserva__booking" href={linkBooking(estado)} target="_blank" rel="noopener">
        <span className="reserva__rotulo">Reservar</span>
        <span className="reserva__valor">
          {noites ? `${noites} ${noites === 1 ? 'noite' : 'noites'} no Booking` : 'Ver disponibilidade'}
          <IconeSeta />
        </span>
      </a>
      {!whatsapp ? null : wa ? (
        <a className="reserva__whatsapp" href={wa} target="_blank" rel="noopener">
          <IconeWhatsapp /> <span>Perguntar por WhatsApp</span>
        </a>
      ) : (
        <span className="reserva__whatsapp" aria-disabled="true">
          <IconeWhatsapp /> <span>WhatsApp — número a confirmar com a casa</span>
        </span>
      )}
    </form>
  );
}
