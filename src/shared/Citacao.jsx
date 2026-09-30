// Citação literal de um hóspede: original com lang, tradução nossa em separado, autor e origem.
export default function Citacao({ c, className = '', grande = false, semTraducao = false }) {
  return (
    <figure className={`cit ${grande ? 'cit--grande' : ''} ${className}`} data-revela>
      <blockquote lang={c.lang ?? c.lingua}>
        <p>“{c.texto}”</p>
      </blockquote>
      {c.traducao && !semTraducao ? <p className="cit__trad">{c.traducao}</p> : null}
      <figcaption className="cit__autor">
        {c.autor} <span>· {c.origem}</span>
      </figcaption>
    </figure>
  );
}
