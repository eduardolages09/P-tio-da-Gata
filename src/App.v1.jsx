import { useEffect, useState } from 'react';
import Foto from './shared/Foto.jsx';
import Reserva, { IconeSeta } from './shared/Reserva.jsx';
import Citacao from './shared/Citacao.jsx';
import Marca from './shared/Marca.jsx';
import BarraMovel from './shared/BarraMovel.jsx';
import useRevela from './shared/useRevela.js';
import { ARREDORES, ARREDORES_FONTE, CASA, CITACOES as C, FACTOS, GATOS, GESTOS, NOTAS, QUARTOS } from './shared/data.js';

// Pátio da Gata — landing. Conteúdo em shared/data.js (tirado de dossie/contrato.json).
// Ordem (estrutura de referência: Oryza): capa · casa · espaços · quartos · quem recebe · Alta ·
// opiniões · reservar.

function Figura({ nome, sizes, className = '', legenda }) {
  return (
    <figure className={`fig ${className}`} data-revela>
      <div className="fig__img"><Foto nome={nome} sizes={sizes} /></div>
      {legenda ? <figcaption>{legenda}</figcaption> : null}
    </figure>
  );
}

function Estrela() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}

const SECOES = [
  ['#casa', 'A Casa'],
  ['#recebe', 'Quem Recebe'],
  ['#quartos', 'Quartos'],
  ['#alta', 'A Alta'],
];

const FITA = [
  ['quarto-22', 'Teto de madeira, duas janelas.'],
  ['quarto-05', 'Candeeiros de parede de latão.'],
  ['quarto-30', 'Gravura de Coimbra sobre a cama.'],
  ['quarto-18', 'Soalho antigo, janela de guilhotina.'],
  ['casa-de-banho-06', 'Casa de banho privativa.'],
  ['quarto-02', 'Uma mesa junto à janela.'],
];

const MAPA = 'https://www.google.com/maps/search/?api=1&query=40.2094133%2C-8.4259098';

function Topo() {
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    if (!aberto) return;
    const fechar = (e) => e.key === 'Escape' && setAberto(false);
    document.addEventListener('keydown', fechar);
    return () => document.removeEventListener('keydown', fechar);
  }, [aberto]);
  return (
    <header className={`topo ${aberto ? 'is-aberto' : ''}`}>
      <a href="#inicio" className="topo__marca"><Marca className="topo__oculo" /><span>Pátio da Gata</span></a>
      <nav id="menu" className="topo__nav" aria-label="Secções">
        <ul>
          {SECOES.map(([href, t]) => (
            <li key={href}><a href={href} onClick={() => setAberto(false)}>{t}</a></li>
          ))}
        </ul>
      </nav>
      <a href="#reserva" className="topo__reservar">Reservar <IconeSeta /></a>
      <button type="button" className="topo__menu" aria-expanded={aberto} aria-controls="menu" onClick={() => setAberto((a) => !a)}>
        {aberto ? 'Fechar' : 'Menu'}
      </button>
    </header>
  );
}

export default function App() {
  useRevela();
  return (
    <>
      <a className="salto" href="#conteudo">Saltar para o conteúdo</a>

      <Topo />
      <main id="conteudo">
      <div className="capa" id="inicio">
        <Foto nome="vista-01" className="capa__fundo" sizes="100vw" prioridade alt="" />
        <div className="capa__conteudo">
          <p className="capa__nota">
            <Estrela /> {NOTAS.booking.nota} / {NOTAS.booking.escala} no Booking · {NOTAS.booking.total} opiniões
          </p>
          <h1>Pátio <em>da</em> Gata</h1>
          <p className="capa__lede">Uma casa antiga da Alta de Coimbra, a poucos minutos a pé da Universidade.</p>
        </div>
        <div className="capa__reserva" id="reserva-topo">
          <Reserva whatsapp={false} />
        </div>
      </div>

        {/* 01 — a casa: texto com espaço, factos em linhas, fachada */}
        <section className="secao casa" id="casa" aria-labelledby="t-casa">
          <div className="casa__texto">
            <p className="kicker" data-revela>01 · A Casa</p>
            <h2 id="t-casa" data-revela>Uma casa antiga, tratada com cuidado.</h2>
            <p className="corpo" data-revela>
              Paredes caiadas, molduras amarelas nas janelas, uma sala comum com a pedra à vista. A casa descreve-se
              em três palavras — <q>{CASA.charme}</q> — e quem lá fica repete outras: limpa, bem decorada, confortável.
            </p>
            <dl className="linhas" data-revela>
              <div><dt>Quartos</dt><dd>Duplos ou twin, de 15 a 25 m², cada um com a sua casa de banho.</dd></div>
              <div><dt>Em comum</dt><dd>Cozinha equipada e sala de estar.</dd></div>
              <div><dt>Na Alta</dt><dd>A Universidade fica a 150 metros, a pé.</dd></div>
            </dl>
          </div>
          <Figura className="casa__fachada" nome="fachada-02" sizes="(min-width: 900px) 40vw, 92vw" legenda="O óculo e a porta, com a moldura amarela." />
          <Figura className="casa__oculo" nome="quarto-16" sizes="(min-width: 900px) 20vw, 60vw" legenda="Um armário antigo, pintado de coral." />
          <Citacao c={C.charme} className="casa__cit" />
        </section>

        {/* faixa a toda a largura: duas fotografias de ponta a ponta (as fotos são verticais) */}
        <div className="faixa">
          <figure data-revela>
            <div className="faixa__img"><Foto nome="fachada-01" sizes="50vw" /></div>
            <figcaption>A fachada, vista do pátio.</figcaption>
          </figure>
          <figure data-revela style={{ '--atraso': '0.12s' }}>
            <div className="faixa__img"><Foto nome="detalhe-01" sizes="50vw" /></div>
            <figcaption>Prateleiras de madeira e um espelho antigo.</figcaption>
          </figure>
        </div>

        {/* 02 — espaços comuns e o que a casa tem */}
        <section className="secao espacos" id="espacos" aria-labelledby="t-espacos">
          <header className="espacos__cab">
            <p className="kicker" data-revela>02 · Ficar aqui</p>
            <h2 id="t-espacos" data-revela>A cozinha e a sala são de todos. O quarto é só seu.</h2>
          </header>
          <Figura className="espacos__f1" nome="refeicoes-01" sizes="(min-width: 900px) 34vw, 92vw" legenda="A mesa de refeições, na cozinha comum." />
          <Figura className="espacos__f2" nome="sala-01" sizes="(min-width: 900px) 24vw, 60vw" legenda="A sala comum, com a pedra à vista." />
          <div className="espacos__cits">
            <Citacao c={C.cozinha} />
            <Citacao c={C.zona} />
          </div>
          <dl className="comodidades" aria-label="O que a casa tem">
            {FACTOS.slice(0, 4).map((f) => (
              <div key={f.t} data-revela><dt>{f.t}</dt><dd>{f.d}</dd></div>
            ))}
          </dl>
        </section>

        {/* 03 — quartos */}
        <section className="secao quartos" id="quartos" aria-labelledby="t-quartos">
          <header className="quartos__cab">
            <p className="kicker" data-revela>03 · Quartos</p>
            <h2 id="t-quartos" data-revela>Para duas pessoas, cada um com a sua casa de banho.</h2>
            <aside className="quartos__cits" aria-label="O que dizem dos quartos">
              <Citacao c={C.elegancia} />
              <Citacao c={C.sono} />
            </aside>
          </header>
          <Figura className="quartos__grande" nome="quarto-10" sizes="(min-width: 900px) 60vw, 100vw" legenda="Colcha florida e espelho antigo." />
          <table className="quartos__tabela" data-revela>
            <caption className="sr-only">Tipos de quarto no Booking</caption>
            <thead>
              <tr><th scope="col">Área</th><th scope="col">Quarto</th><th scope="col">Camas</th><th scope="col">Destaque</th></tr>
            </thead>
            <tbody>
              {QUARTOS.map((q, i) => (
                <tr key={i}>
                  <td className="quartos__m2">{q.m2}<small> m²</small></td>
                  <th scope="row">{q.nome}</th>
                  <td>{q.camas}</td>
                  <td>{q.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="nota-fonte">Nomes e áreas como aparecem no Booking. As fotografias são de vários quartos da casa.</p>
          <ul className="fita" aria-label="Fotografias dos quartos">
            {FITA.map(([n, l]) => (
              <li key={n}>
                <figure>
                  <div className="fig__img"><Foto nome={n} sizes="(min-width: 900px) 24vw, 72vw" /></div>
                  <figcaption>{l}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        {/* 04 — quem recebe, a única secção escura */}
        <section className="recebe" id="recebe" aria-labelledby="t-recebe">
          <div className="recebe__interior">
            <div className="recebe__intro">
              <p className="kicker" data-revela>04 · Quem Recebe</p>
              <h2 id="t-recebe" data-revela>Os hóspedes falam dela pelo nome.</h2>
              <p data-revela>O que contam, de estadia para estadia:</p>
              <p className="recebe__nota" data-revela>
                <strong>{NOTAS.booking.funcionarios}</strong>
                <span>nota “Funcionários” no Booking, em 10 ({NOTAS.booking.total} opiniões, {NOTAS.data})</span>
              </p>
            </div>
            <ol className="gestos">
              {GESTOS.map((g, i) => (
                <li key={g.t} data-revela style={{ '--atraso': `${i * 0.06}s` }}>
                  <span className="gestos__n">{String(i + 1).padStart(2, '0')}</span>
                  {g.t}
                </li>
              ))}
            </ol>
            <div className="recebe__cits">
              <Citacao c={C.marca} grande />
              <Citacao c={C.cafeteira} />
            </div>
          </div>
        </section>

        {/* 05 — a Alta */}
        <section className="secao alta" id="alta" aria-labelledby="t-alta">
          <Figura className="alta__foto" nome="patio-01" sizes="(min-width: 900px) 38vw, 92vw" legenda="O pátio visto de cima, com a cidade ao fundo." />
          <div className="alta__texto">
            <p className="kicker" data-revela>05 · A Alta</p>
            <h2 id="t-alta" data-revela>A Universidade fica a 150 metros.</h2>
            <ul className="distancias" data-revela>
              {ARREDORES.map((a) => (
                <li key={a.nome}><span>{a.nome}</span><b>{a.dist}</b></li>
              ))}
            </ul>
            <p className="nota-fonte">{ARREDORES_FONTE}</p>
            <address className="alta__morada" data-revela>
              <span>Travessa de São Salvador, 3000-374 Coimbra</span>
              <a className="ligacao" href={MAPA} target="_blank" rel="noopener">Abrir no Google Maps <IconeSeta /></a>
            </address>
            <div className="alta__cits">
              <Citacao c={C.pe} grande />
              <figure className="cit cit--casa" data-revela>
                <blockquote><p>“{CASA.varanda}”</p></blockquote>
                <figcaption className="cit__autor">A casa, no anúncio</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 06 — opiniões, com fonte, escala e data */}
        <section className="secao opinioes" id="opinioes" aria-labelledby="t-opinioes">
          <header className="opinioes__cab">
            <p className="kicker" data-revela>06 · Opiniões</p>
            <h2 id="t-opinioes" data-revela>O que fica de uma estadia.</h2>
          </header>
          <dl className="notas" data-revela>
            <div><dt>Booking</dt><dd><b>{NOTAS.booking.nota}</b> / {NOTAS.booking.escala}<small>{NOTAS.booking.total} opiniões</small></dd></div>
            <div><dt>Limpeza</dt><dd><b>{NOTAS.booking.limpeza}</b> / 10<small>nota no Booking</small></dd></div>
            <div><dt>Google</dt><dd><b>{NOTAS.google.nota}</b> / {NOTAS.google.escala}<small>{NOTAS.google.total} opiniões</small></dd></div>
          </dl>
          <p className="nota-fonte">Notas consultadas em {NOTAS.data}.</p>
          <div className="opinioes__cits">
            <Citacao c={C.melhor} grande />
            <Citacao c={C.gem} />
            <Citacao c={C.onze} />
            <Citacao c={C.casa} />
          </div>
        </section>

        {/* gatos */}
        <section className="gatos" id="gatos" aria-labelledby="t-gatos">
          <Marca className="gatos__marca" />
          <div data-revela>
            <h2 id="t-gatos" className="gatos__titulo">{GATOS.frase}</h2>
            <p>Os animais dos hóspedes também são bem-vindos, mediante pedido e sem custo.</p>
          </div>
          <Citacao c={C.hostess} />
        </section>

        {/* 07 — reservar */}
        <section className="secao fim" id="reserva" aria-labelledby="t-reserva">
          <header className="fim__cab">
            <p className="kicker" data-revela>07 · Reservar</p>
            <h2 id="t-reserva" data-revela>Escolha as datas.</h2>
            <p data-revela>A reserva faz-se no Booking. Para perguntas, fale connosco por WhatsApp.</p>
          </header>
          <Reserva className="reserva--claro" titulo="Reservar" />
          <dl className="linhas linhas--horas">
            {FACTOS.slice(4).map((f) => (
              <div key={f.t}><dt>{f.t}</dt><dd>{f.d}</dd></div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="rodape">
        <div className="rodape__marca"><Marca /><span>Pátio da Gata</span></div>
        <p>Travessa de São Salvador, 3000-374 Coimbra</p>
        <p>Alojamento Local {CASA.registos}</p>
        <p><a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener">Livro de Reclamações</a></p>
        <p className="rodape__nota">Avaliações e citações verificadas em {NOTAS.data}</p>
      </footer>
      <BarraMovel />
    </>
  );
}
