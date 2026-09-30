// Marca: o óculo oval da fachada, com uma gata sentada no parapeito.
// Decorativa por defeito (aparece sempre ao lado do nome); passar `titulo` se estiver sozinha.
export default function Marca({ className = '', titulo = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 80" {...(titulo ? { role: 'img', 'aria-label': titulo } : { 'aria-hidden': true, focusable: 'false' })}>
      <ellipse cx="32" cy="36" rx="24" ry="30" fill="none" stroke="var(--marca-moldura, #d8a233)" strokeWidth="5" />
      <ellipse cx="32" cy="36" rx="17.5" ry="23.5" fill="var(--marca-vidro, transparent)" />
      <path fill="var(--marca-gata, #1f1b16)" d="M27.5 44.5l-1.6-6.8 3.4 3.3q2.7-.9 5.4 0l3.4-3.3-1.6 6.8q2.3 2.4 1.7 5.6 3.1 4.2 2.2 9.9H24.6q-.9-5.7 2.2-9.9-.6-3.2.7-5.6z" />
      <path fill="none" stroke="var(--marca-gata, #1f1b16)" strokeWidth="1.6" strokeLinecap="round" d="M39.4 59.4q6.5-.6 5.6-6.8" />
      <rect x="10" y="59.6" width="44" height="3.2" rx="1" fill="var(--marca-moldura, #d8a233)" />
    </svg>
  );
}
