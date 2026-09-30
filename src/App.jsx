import { useEffect, useRef, useState } from 'react';
import Foto from './shared/Foto.jsx';
import BarraMovel from './shared/BarraMovel.jsx';
import useRevela from './shared/useRevela.js';
import BarraReserva from './BarraReserva.jsx';
import BlurText from './BlurText.jsx';
import Galeria from './Galeria.jsx';
import Perto from './Perto.jsx';
import Gatos from './Gatos.jsx';
import { CASA, CITACOES as C, GALERIAS, GATOS, QUARTOS } from './shared/data.js';

// Pátio da Gata — landing v2 (referência visual: "Vanya"). Conteúdo em shared/data.js, tirado de
// dossie/contrato.json: não acrescentar factos que não estejam lá. A versão anterior está em App.v1.jsx.
// Ordem: capa · casa · quartos · espaços comuns · ficar aqui · por perto · gatos · reservar. Sem notas nem
// avaliações (pedido do cliente): a única citação de hóspede é a do cartão dos gatos. Reservar só pelas barras de
// datas/pessoas, que levam tudo para o Booking.

const SECOES = [
  ['inicio', 'Início'],
  ['casa', 'A Casa'],
  ['quartos', 'Quartos'],
  ['espacos', 'Espaços'],
  ['alta', 'Por perto'],
];

const MAPA = 'https://www.google.com/maps/search/?api=1&query=40.2094133%2C-8.4259098';

/* ---------- ícones (traço, 24×24) ---------- */

const ICONES = {
  cama: <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 15h18M6 10V7h5v3m2 0V7h5v3M3 18v2m18-2v2" />,
  duche: <path d="M5 21V8a3 3 0 0 1 6 0M8 8h6m-4.5 4-.5 1m3-1v1m2.5-1 .5 1m-5 3-.5 1m3-1v1m2.5-1 .5 1" />,
  janela: <path d="M5 3h14v18H5zM12 3v18M5 12h14" />,
  wifi: <path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M9 16a4.5 4.5 0 0 1 6 0M12 19.5h.01" />,
  chavena: <path d="M4 9h13v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zm13 1h1.5a2.5 2.5 0 0 1 0 5H16M8 3v3m4-3v3" />,
  pata: <path d="M12 20c-3.2 0-5-1.6-5-3.5 0-2.3 2.6-4.5 5-4.5s5 2.2 5 4.5c0 1.9-1.8 3.5-5 3.5zM6.5 11.5a1.6 2 0 1 0 0-.01M9.5 7.5a1.6 2.1 0 1 0 0-.01m5 0a1.6 2.1 0 1 0 0-.01m3 4a1.6 2 0 1 0 0-.01" />,
  entrada: <path d="M10 4H5v16h5m4-12 4 4-4 4m4-4H8" />,
  saida: <path d="M14 4h5v16h-5M10 8l-4 4 4 4m-4-4h10" />,
  conversa: <path d="M4 5h16v11H10l-5 4v-4H4z" />,
  berco: <path d="M4 5v15M20 5v15M4 17h16M4 9h16M8 9v8m4-8v8m4-8v8" />,
  semCarro: <path d="M4 4h16v16H4zM9.5 16V8h3.5a2.5 2.5 0 0 1 0 5H9.5M4 20 20 4" />,
  ventoinha: <path d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0-3C11 7 12.5 3.5 15 4s2 3.8-3 6.5zm1.4 2.2c3 1 5.3 3.9 3.8 6-1.6 2-4.6.2-5.2-4.4zm-2.8 0c-2.4 2-6 2.4-7-.2-.8-2.5 2.6-3.4 6.4-.7z" />,
  semFumo: <path d="M3 14h12v3H3zm15 0v3m0-6c0-2-2-2-2-4m4 4c0-2-2-2-2-4M4 4l16 16" />,
  pin: <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  fotos: <path d="M4 7h3l2-2.5h6L17 7h3v12H4zm8 9.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />,
  esq: <path d="m15 5-7 7 7 7" />,
  dir: <path d="m9 5 7 7-7 7" />,
};

function Icone({ nome, tamanho = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={tamanho} height={tamanho} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {ICONES[nome]}
    </svg>
  );
}

function Estrela() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}

/* ---------- peças ---------- */


function Cabecalho({ id, kicker, titulo, texto, centrado = false }) {
  return (
    <header className={`cab ${centrado ? 'cab--centro' : ''}`}>
      {kicker ? <p className="cab__kicker" data-revela>{kicker}</p> : null}
      <h2 id={id} data-revela>{titulo}</h2>
      {texto ? <p className="cab__texto" data-revela>{texto}</p> : null}
    </header>
  );
}

// Citação literal: o original (com lang), a tradução para português por baixo, autor e origem.
function Opiniao({ c, className = '', etiqueta }) {
  return (
    <figure className={`opiniao ${className}`} data-revela>
      {etiqueta ? <span className={`opiniao__etiqueta ${etiqueta === 'Quem recebe' ? 'opiniao__etiqueta--recebe' : ''}`}>{etiqueta}</span> : null}
      <blockquote lang={c.lingua}>
        <p>“{c.texto}”</p>
      </blockquote>
      {c.traducao ? <p className="opiniao__trad" lang="pt">{c.traducao}</p> : null}
      <figcaption>
        <span className="opiniao__inicial" aria-hidden="true">{c.autor[0]}</span>
        <span><b>{c.autor}</b><small>{c.origem}</small></span>
      </figcaption>
    </figure>
  );
}

/* ---------- topo ---------- */

function useSecaoAtiva() {
  const [ativa, setAtiva] = useState('inicio');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setAtiva(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECOES.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ativa;
}

// o botão "Reservar" da barra de cima leva ao cartão final, com a barra de datas ao centro do ecrã
function irParaReserva(e) {
  const alvo = document.querySelector('#reserva .br');
  if (!alvo) return;
  e.preventDefault();
  const r = alvo.getBoundingClientRect();
  const maximo = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({ top: Math.min(maximo, window.scrollY + r.top + r.height / 2 - window.innerHeight / 2), behavior: 'smooth' });
}

function Topo() {
  const [aberto, setAberto] = useState(false);
  const [solido, setSolido] = useState(false);
  const ativa = useSecaoAtiva();
  const barra = useRef(null);
  const progresso = useRef(null);

  // transparente sobre as fotos de ponta a ponta (a capa, no início, e o cartão final "Escolha as datas", no fim);
  // no resto da página tem fundo claro
  useEffect(() => {
    const aoRolar = () => {
      const b = barra.current.getBoundingClientRect();
      const toca = (topo, fundo) => topo <= b.bottom && fundo >= b.top;
      const fim = document.getElementById('reserva')?.getBoundingClientRect();
      // só sobre a foto: se passar por cima do texto ou da barra de reserva do cartão (do título às horas), volta a ter fundo
      const texto = document.getElementById('t-reserva')?.getBoundingClientRect();
      const horas = document.querySelector('.fim__horas')?.getBoundingClientRect();
      const sobreFim = fim && toca(fim.top, fim.bottom) && !(texto && horas && toca(texto.top, horas.bottom));
      setSolido(window.scrollY > 40 && !sobreFim);
      const maximo = document.documentElement.scrollHeight - window.innerHeight;
      progresso.current.style.transform = `scaleX(${maximo > 0 ? Math.min(1, window.scrollY / maximo).toFixed(4) : 0})`;
      // a linha dourada desaparece logo que a foto do cartão final chega à barra (e volta se se subir outra vez)
      progresso.current.parentElement.style.visibility = fim && fim.top <= b.bottom ? 'hidden' : '';
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e) => e.key === 'Escape' && setAberto(false);
    document.addEventListener('keydown', fechar);
    return () => document.removeEventListener('keydown', fechar);
  }, [aberto]);

  return (
    <header className={`topo ${solido || aberto ? 'is-solido' : ''} ${aberto ? 'is-aberto' : ''}`} ref={barra}>
      <a href="#inicio" className="topo__marca">Pátio da Gata</a>
      <nav id="menu" className="topo__nav" aria-label="Secções">
        <ul>
          {SECOES.map(([id, t]) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={ativa === id ? 'true' : undefined} onClick={() => setAberto(false)}>{t}</a>
            </li>
          ))}
        </ul>
      </nav>
      <button type="button" className="topo__menu" aria-expanded={aberto} aria-controls="menu" onClick={() => setAberto((a) => !a)}>
        {aberto ? 'Fechar' : 'Menu'}
      </button>
      <a href="#reserva" className="pilula pilula--acento topo__reservar" onClick={irParaReserva}>Reservar</a>
      <span className="topo__progresso" aria-hidden="true"><span ref={progresso} /></span>
    </header>
  );
}

/* ---------- quartos (carrossel) ---------- */

// As fotos de cada cartão são a galeria que o Booking associa a esse tipo (GALERIAS em data.js).
// ponytail: falta a dona confirmar que quarto é qual; até lá a nota por baixo do carrossel fica.
const maiuscula = (s) => s[0].toUpperCase() + s.slice(1);
const titulo = (q) => (q.nome === 'Duplo' ? 'Quarto Duplo' : `Quarto ${q.nome}`);

// Galeria horizontal comandada pelo scroll: ao chegar aos quartos a secção fica presa (sticky) e descer faz deslizar
// os cartões para a esquerda, 1 px de scroll por 1 px de deslocação. A secção cresce o que os cartões têm a
// mais que o ecrã (--extra). Em ecrãs baixos ou com movimento reduzido volta ao carrossel com setas.
const ROLAGEM = '(min-height: 560px) and (prefers-reduced-motion: no-preference)';

function Quartos() {
  const pista = useRef(null);
  const janela = useRef(null);
  const lista = useRef(null);
  const barra = useRef(null);
  const [rolagem, setRolagem] = useState(() => window.matchMedia(ROLAGEM).matches);
  const [pos, setPos] = useState({ inicio: true, fim: false });
  const [aberto, setAberto] = useState(null); // índice do quarto com a galeria aberta

  useEffect(() => {
    const mq = window.matchMedia(ROLAGEM);
    const mudar = () => setRolagem(mq.matches);
    mq.addEventListener('change', mudar);
    return () => mq.removeEventListener('change', mudar);
  }, []);

  // modo scroll: mede o que sobra à direita e desloca a fila conforme o scroll dentro da pista
  useEffect(() => {
    const el = lista.current;
    if (!rolagem) { el.style.transform = ''; pista.current.style.removeProperty('--extra'); return; }
    let pedido = 0;
    let extra = 0;
    const mover = () => {
      pedido = 0;
      const total = pista.current.offsetHeight - window.innerHeight;
      const p = total > 0 ? limitar(-pista.current.getBoundingClientRect().top / total) : 0;
      el.style.transform = `translate3d(${(-p * extra).toFixed(1)}px, 0, 0)`;
      barra.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const medir = () => {
      extra = Math.max(0, el.scrollWidth - janela.current.clientWidth);
      pista.current.style.setProperty('--extra', `${Math.round(extra)}px`);
      mover();
    };
    const aoRolar = () => { if (!pedido) pedido = requestAnimationFrame(mover); };
    medir();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', medir);
    return () => { cancelAnimationFrame(pedido); window.removeEventListener('scroll', aoRolar); window.removeEventListener('resize', medir); };
  }, [rolagem]);

  // com o teclado: um cartão fora do ecrã que recebe o foco é trazido para a vista, descendo a página
  const aoFocar = (e) => {
    if (!rolagem) return;
    const li = e.target.closest('.quarto');
    const total = pista.current.offsetHeight - window.innerHeight;
    const extra = lista.current.scrollWidth - janela.current.clientWidth;
    if (!li || total <= 0 || extra <= 0) return;
    const x = limitar(li.offsetLeft - lista.current.firstElementChild.offsetLeft, 0, extra);
    const topo = pista.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: topo + (x / extra) * total, behavior: 'instant' });
  };

  // modo carrossel (sem scroll a comandar): setas
  const atualizar = () => {
    const el = janela.current;
    if (!el || rolagem) return;
    setPos({ inicio: el.scrollLeft < 8, fim: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(() => {
    atualizar();
    window.addEventListener('resize', atualizar);
    return () => window.removeEventListener('resize', atualizar);
  }, [rolagem]);
  const mover = (dir) => {
    const cartao = lista.current.querySelector('li');
    janela.current.scrollBy({ left: dir * (cartao.offsetWidth + 20), behavior: 'smooth' });
  };

  return (
    <section className={`quartos ${rolagem ? 'is-rolagem' : ''}`} id="quartos" aria-labelledby="t-quartos">
      <div className="quartos__pista" ref={pista}>
        <div className="quartos__cena">
          <div className="quartos__topo">
            <Cabecalho
              id="t-quartos"
              centrado
              titulo="Quartos para duas pessoas"
              texto="Duplos ou twin, de 15 a 25 m², cada um com a sua casa de banho privativa com duche."
            />
          </div>
          <div className="quartos__janela" ref={janela} onScroll={atualizar}>
            <ul className="carrossel" ref={lista} onFocus={aoFocar} aria-label="Tipos de quarto">
              {QUARTOS.map((q, i) => {
                const fotos = GALERIAS[q.codigo];
                return (
                <li key={i} className="quarto" data-revela style={{ '--atraso': `${Math.min(i, 3) * 0.12}s` }}>
                  <button type="button" className="quarto__img" onClick={() => setAberto(i)} aria-label={`Ver as ${fotos.length} fotografias: ${titulo(q)}`}>
                    <Foto nome={fotos[0]} sizes="(min-width: 1000px) 30vw, (min-width: 640px) 45vw, 82vw" />
                    <span className="quarto__area">{q.m2} m²</span>
                    <span className="quarto__nfotos" aria-hidden="true"><Icone nome="fotos" tamanho={14} />{fotos.length}</span>
                  </button>
                  <h3>{titulo(q)}</h3>
                  <ul className="quarto__specs">
                    <li><Icone nome="cama" tamanho={16} />{maiuscula(q.camas)}</li>
                    <li><Icone nome="duche" tamanho={16} />WC privativo</li>
                    <li><Icone nome="janela" tamanho={16} />{maiuscula(q.nota)}</li>
                  </ul>
                  <button type="button" className="pilula pilula--contorno" onClick={() => setAberto(i)}>
                    Ver fotos <span className="pilula__n">{fotos.length}</span>
                  </button>
                </li>
                );
              })}
            </ul>
          </div>
          <div className="carrossel__rodape">
            <span className="quartos__progresso" aria-hidden="true"><span ref={barra} /></span>
            <div className="carrossel__setas">
              <button type="button" onClick={() => mover(-1)} disabled={pos.inicio} aria-label="Quartos anteriores"><Icone nome="esq" /></button>
              <button type="button" onClick={() => mover(1)} disabled={pos.fim} aria-label="Quartos seguintes"><Icone nome="dir" /></button>
            </div>
          </div>
        </div>
      </div>
      {aberto !== null ? (
        <Galeria titulo={titulo(QUARTOS[aberto])} fotos={GALERIAS[QUARTOS[aberto].codigo]} aoFechar={() => setAberto(null)} />
      ) : null}
    </section>
  );
}

/* ---------- conteúdo fixo ---------- */

const COMODIDADES = [
  ['duche', 'Casa de banho privativa', 'Em todos os quartos, com duche.'],
  ['chavena', 'Cozinha e sala comuns', 'Cozinha equipada e sala de estar.'],
  ['wifi', 'Wi-Fi gratuito', 'Em toda a casa.'],
  ['pata', 'Animais bem-vindos', 'Mediante pedido, sem custo.'],
  ['entrada', 'Check-in', 'Das 15:00 às 22:00.'],
  ['saida', 'Check-out', 'Até às 11:00.'],
  ['conversa', 'Idiomas', 'Português, inglês, espanhol e francês.'],
  ['berco', 'Berço gratuito', 'Até aos 3 anos, mediante pedido.'],
];

const BOM_SABER = [
  ['semCarro', 'Não há estacionamento no alojamento.'],
  ['ventoinha', 'Aquecimento e ventoinha nos quartos; sem ar condicionado (zona histórica protegida).'],
  ['semFumo', 'Não é permitido fumar. Não há camas extra.'],
];

// Espaços comuns em três colunas: à esquerda a foto, ao meio as divisões comuns, à direita o texto.
// Ao descer, a secção fica presa ao centro do ecrã durante um troço curto (PASSO por divisão) e a divisão ativa muda
// com o scroll; dentro de cada divisão as perspetivas (fotos) rodam sozinhas a cada VISTA ms, e as miniaturas por
// baixo da foto deixam escolher uma. Para juntar fotos a uma divisão basta acrescentá-las à lista `fotos` dela
// (depois de as gerar com scripts/imagens.py). A troca é um fundido em CSS. A galeria tem todas as fotos.
// Factos: dossie/factos.md ("Cozinha partilhada", "Sala comum").
const ESPACOS = [
  { nome: 'Cozinha', fotos: ['cozinha-01', 'cozinha-02', 'cozinha-03'], texto: 'Totalmente equipada, com frigorífico, máquina de café e chaleira. Há chá e café.' },
  { nome: 'Mesa de refeições', fotos: ['refeicoes-01'], texto: 'Uma mesa comum junto à cozinha, com a parede de pedra à vista.' },
  { nome: 'Sala comum', fotos: ['sala-02', 'sala-01'], texto: 'Sofá e televisão, para descansar ou conviver.' },
];
const FOTOS_ESPACOS = ESPACOS.flatMap((e) => e.fotos);
const PASSO = 0.33; // ecrãs de scroll por divisão, com a secção presa
const VISTA = 3200; // ms por perspetiva
const BARRA = 88; // altura da barra de cima (px), para centrar a secção no espaço que sobra

function Espacos() {
  const cena = useRef(null);
  const folga = useRef(null);
  const topoPreso = useRef(0);
  const [ativo, setAtivo] = useState(0);
  const [vista, setVista] = useState(0); // perspetiva à vista dentro da divisão ativa
  const [aVer, setAVer] = useState(false); // secção no ecrã: só aí as perspetivas rodam
  const [parado, setParado] = useState(false); // rato por cima da foto
  const [aberta, setAberta] = useState(null); // índice da foto com que a galeria abre
  const n = ESPACOS.length;
  const fotos = ESPACOS[ativo].fotos;

  // scroll em que a secção fica presa (o topo da cena chega a topoPreso)
  const inicio = () => window.scrollY + folga.current.getBoundingClientRect().top - topoPreso.current - cena.current.offsetHeight;

  useEffect(() => {
    let pedido = 0;
    // a cena fica centrada abaixo da barra; se não couber (telemóvel), fica presa pelo fundo, acima da barra dourada
    const fixar = () => {
      const vh = window.innerHeight;
      const h = cena.current.offsetHeight;
      const baixo = window.innerWidth <= 760 ? 84 : 16;
      const topo = h <= vh - BARRA - baixo ? BARRA + (vh - BARRA - baixo - h) / 2 : vh - h - baixo;
      topoPreso.current = topo;
      cena.current.style.top = `${Math.round(topo)}px`;
    };
    const ver = () => {
      pedido = 0;
      const t = (window.scrollY - inicio()) / Math.max(1, folga.current.offsetHeight);
      setAtivo(Math.min(n - 1, Math.max(0, Math.floor(t * n))));
      const r = cena.current.getBoundingClientRect();
      setAVer(r.top < window.innerHeight && r.bottom > 0);
    };
    const aoRolar = () => { if (!pedido) pedido = requestAnimationFrame(ver); };
    const aoMudar = () => { fixar(); aoRolar(); };
    fixar();
    ver();
    const ro = new ResizeObserver(aoMudar);
    ro.observe(cena.current);
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoMudar);
    return () => { cancelAnimationFrame(pedido); ro.disconnect(); window.removeEventListener('scroll', aoRolar); window.removeEventListener('resize', aoMudar); };
  }, [n]);

  // nova divisão: começa na primeira perspetiva
  useEffect(() => { setVista(0); }, [ativo]);

  // as perspetivas rodam sozinhas enquanto a secção está à vista
  useEffect(() => {
    if (!aVer || parado || fotos.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setTimeout(() => setVista((v) => (v + 1) % fotos.length), VISTA);
    return () => clearTimeout(id);
  }, [aVer, parado, vista, fotos.length]);

  // escolher uma divisão desliza a página até ao meio do troço dela
  const irPara = (i) => window.scrollTo({ top: inicio() + ((i + 0.5) / n) * folga.current.offsetHeight, behavior: 'smooth' });

  const aRodar = aVer && !parado && fotos.length > 1;
  return (
    <section className="secao espacos" id="espacos" aria-labelledby="t-espacos">
      <div className="espacos__cena" ref={cena}>
        <div className="espacos__fotos" data-revela onMouseEnter={() => setParado(true)} onMouseLeave={() => setParado(false)}>
          <button type="button" className="espacos__palco" onClick={() => setAberta(FOTOS_ESPACOS.indexOf(fotos[vista]))} aria-label={`Ver fotografias: ${ESPACOS[ativo].nome}`}>
            {FOTOS_ESPACOS.map((f) => (
              <Foto key={f} nome={f} sizes="(min-width: 1000px) 30vw, 92vw" className={`espacos__foto ${f === fotos[vista] ? 'is-ativa' : ''}`} />
            ))}
            <span className="espacos__selo">{ESPACOS[ativo].nome}</span>
            {fotos.length > 1 ? <span className="espacos__conta" aria-hidden="true">{vista + 1} / {fotos.length}</span> : null}
          </button>
          {/* miniaturas das perspetivas da divisão ativa; a atual tem uma barra que enche até à troca. Com uma só foto
              ficam escondidas mas guardam o lugar, para a cena não mudar de altura */}
          <ul className="espacos__vistas" aria-label={`Perspetivas: ${ESPACOS[ativo].nome}`} hidden={fotos.length < 2 || undefined}>
            {fotos.map((f, k) => (
              <li key={f}>
                <button type="button" aria-label={`Perspetiva ${k + 1} de ${fotos.length}`} aria-current={k === vista ? 'true' : undefined} onClick={() => setVista(k)}>
                  <Foto nome={f} sizes="96px" />
                  {k === vista && aRodar ? <span key={`${ativo}-${vista}`} className="espacos__tempo" style={{ '--vista': `${VISTA}ms` }} /> : null}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ol className="espacos__lista" data-revela style={{ '--atraso': '0.1s' }}>
          {ESPACOS.map((e, i) => (
            <li key={e.nome}>
              <button type="button" className="espacos__item" aria-current={i === ativo ? 'true' : undefined} onClick={() => irPara(i)}>
                <span className="espacos__n">0{i + 1}</span>
                <span className="espacos__nome">{e.nome}</span>
                <span className="espacos__texto">{e.texto}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="espacos__lado">
          <p className="cab__kicker" data-revela>Espaços comuns</p>
          <h2 id="t-espacos" data-revela>A cozinha e a sala são de todos. O quarto é só seu.</h2>
          <p className="espacos__intro" data-revela>
            A cozinha, a mesa de refeições e a sala comum são partilhadas pelos hóspedes da casa e estão abertas a qualquer hora.
          </p>
          <div className="espacos__seu" data-revela>
            <p className="espacos__rotulo">Só seu</p>
            <ul>
              <li><Icone nome="cama" tamanho={20} />O quarto</li>
              <li><Icone nome="duche" tamanho={20} />A casa de banho, privativa e com duche</li>
            </ul>
          </div>
          <button type="button" className="pilula pilula--contorno" data-revela onClick={() => setAberta(0)}>
            Ver as fotos <span className="pilula__n">{FOTOS_ESPACOS.length}</span>
          </button>
        </div>
      </div>
      {/* o troço de scroll em que a cena fica presa */}
      <div className="espacos__folga" ref={folga} style={{ height: `${(n * PASSO * 100).toFixed(1)}svh` }} aria-hidden="true" />
      {aberta !== null ? (
        <Galeria titulo="Espaços comuns" fotos={FOTOS_ESPACOS} inicio={aberta} aoFechar={() => setAberta(null)} />
      ) : null}
    </section>
  );
}

const limitar = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

// Número que conta de 0 até ao valor quando entra no ecrã ("150", "15–25", "8,8": cada número do texto conta).
function Contador({ valor, duracao = 1600 }) {
  const el = useRef(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    setK(0);
    let pedido = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const passo = (t) => {
        const f = Math.min(1, (t - t0) / duracao);
        setK(1 - (1 - f) ** 4);
        if (f < 1) pedido = requestAnimationFrame(passo);
      };
      pedido = requestAnimationFrame(passo);
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el.current);
    return () => { io.disconnect(); cancelAnimationFrame(pedido); setK(1); };
  }, [duracao]);
  const texto = String(valor).replace(/\d+(?:,\d+)?/g, (n) => {
    const casas = (n.split(',')[1] || '').length;
    return (parseFloat(n.replace(',', '.')) * k).toFixed(casas).replace('.', ',');
  });
  return <span className="contador" ref={el}>{texto}</span>;
}

// Fotos com profundidade: a imagem dentro de [data-paralaxe] desliza dentro da moldura (até N% da altura, com a
// imagem ampliada no CSS) e cada [data-flutua] sobe N px mais depressa do que a secção, medido pelo elemento-pai.
function useParalaxe() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const molduras = [...document.querySelectorAll('[data-paralaxe]')];
    const flutuantes = [...document.querySelectorAll('[data-flutua]')];
    let pedido = 0;
    const mover = () => {
      pedido = 0;
      const vh = window.innerHeight;
      const posicao = (r) => limitar((r.top + r.height / 2 - vh / 2) / vh, -1, 1); // -1 em cima, 0 ao centro, 1 em baixo
      for (const m of molduras) {
        const r = m.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const img = m.querySelector('img');
        if (img) img.style.translate = `0 ${(posicao(r) * -Number(m.dataset.paralaxe)).toFixed(2)}%`;
      }
      for (const f of flutuantes) {
        const r = f.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        f.style.translate = `0 ${(posicao(r) * Number(f.dataset.flutua)).toFixed(1)}px`;
      }
    };
    const aoRolar = () => { if (!pedido) pedido = requestAnimationFrame(mover); };
    mover();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    return () => { cancelAnimationFrame(pedido); window.removeEventListener('scroll', aoRolar); window.removeEventListener('resize', aoRolar); };
  }, []);
}

/* ---------- página ---------- */

// Capa ao descer: o cartão perde a margem e os cantos até encostar às margens do ecrã (--exp, 0 → 1,
// usado no CSS) e a foto aproxima-se (zoom) enquanto desce mais devagar do que a página (parallax).
function useCapaAoDescer({ distancia = 0.6, zoom = 0.14, parallax = 0.18 } = {}) {
  const capa = useRef(null);
  const foto = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let pedido = 0;
    const mover = () => {
      pedido = 0;
      const y = window.scrollY;
      if (!capa.current || y > window.innerHeight * 1.3) return;
      const t = Math.min(1, y / (window.innerHeight * distancia));
      const exp = 1 - (1 - t) ** 3; // desacelera no fim
      capa.current.style.setProperty('--exp', exp.toFixed(4));
      foto.current.style.transform = `translate3d(0, ${y * parallax}px, 0) scale(${1 + zoom * exp})`;
    };
    const aoRolar = () => { if (!pedido) pedido = requestAnimationFrame(mover); };
    mover();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    return () => { cancelAnimationFrame(pedido); window.removeEventListener('scroll', aoRolar); window.removeEventListener('resize', aoRolar); };
  }, [distancia, zoom, parallax]);
  return { capa, foto };
}

// Cortina: a secção fica presa quando o fundo dela chega ao fundo do ecrã (sticky, top = ecrã − altura) e o
// cartão final sobe por cima dela. A altura muda com o ecrã e o conteúdo, por isso é medida.
function useCortina() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const medir = () => { el.style.top = `${window.innerHeight - el.offsetHeight}px`; };
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    window.addEventListener('resize', medir);
    return () => { ro.disconnect(); window.removeEventListener('resize', medir); };
  }, []);
  return ref;
}

// Cartão final (cortina): sobe por cima da secção dos gatos, que fica presa (useCortina) e recua — encolhem e
// desvanecem (--atras, 0 → 1 enquanto o cartão cobre o ecrã). O cartão chega com os cantos redondos e só no fim
// estica até às bordas (--exp, em curva suave: chega a 1 quando o topo do cartão sobe a 30% do ecrã, ou no fim da
// página, se não houver scroll que chegue); a foto assenta ao mesmo tempo, de ampliada para o tamanho normal.
function useFimAoDescer({ zoom = 0.14 } = {}) {
  const fim = useRef(null);
  const foto = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let pedido = 0;
    const mover = () => {
      pedido = 0;
      if (!fim.current) return;
      const vh = window.innerHeight;
      const topo = fim.current.getBoundingClientRect().top;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const alvo = Math.max(vh * 0.3, topo + window.scrollY - maxScroll); // onde fica o topo no fim da página
      const t = Math.min(1, Math.max(0, (vh - topo) / Math.max(1, vh - alvo)));
      const exp = t * t * (3 - 2 * t);
      fim.current.style.setProperty('--exp', exp.toFixed(4));
      foto.current.style.transform = `scale(${(1 + zoom * (1 - exp)).toFixed(4)})`;
      const atras = fim.current.previousElementSibling;
      if (atras) atras.style.setProperty('--atras', Math.min(1, Math.max(0, (vh - topo) / vh)).toFixed(4));
    };
    const aoRolar = () => { if (!pedido) pedido = requestAnimationFrame(mover); };
    mover();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    return () => { cancelAnimationFrame(pedido); window.removeEventListener('scroll', aoRolar); window.removeEventListener('resize', aoRolar); };
  }, [zoom]);
  return { fim, foto };
}

export default function App() {
  useRevela();
  const capa = useCapaAoDescer();
  const fim = useFimAoDescer();
  const gatos = useCortina();
  useParalaxe();

  return (
    <>
      <a className="salto" href="#conteudo">Saltar para o conteúdo</a>
      <Topo />

      <main id="conteudo">
        {/* capa (formato da referência): Coimbra ao pôr do sol, os telhados e o Mondego (imagem escolhida pelo cliente:
            fotos-externas/CREDITOS.md), palavra gigante clara a desvanecer com a animação BlurText
            (React Bits), aproximação lenta da foto ao abrir; ao descer, a foto amplia-se e o cartão cresce até às
            margens do ecrã (useCapaAoDescer); barra de reserva a sair do cartão */}
        <section className="capa" id="inicio" aria-labelledby="t-capa" ref={capa.capa}>
          <div className="capa__fundo">
            <div className="capa__movel" ref={capa.foto}>
              <Foto nome="coimbra-entardecer-02" sizes="(max-width: 700px) and (min-resolution: 2.5dppx) 134vw, (max-width: 700px) 200vw, 100vw" prioridade alt="" />
            </div>
          </div>
          <div className="capa__conteudo">
            <BlurText as="h1" id="t-capa" className="capa__palavra" aria-label="Pátio da Gata" grupos={['Pátio', 'da Gata']} />
            <p className="capa__titulo">Uma casa antiga na Alta de Coimbra</p>
            <p className="capa__lede">
              Quartos com casa de banho privativa, cozinha e sala comuns, a poucos minutos a pé da Universidade.
            </p>
          </div>
          <div className="capa__reserva">
            <BarraReserva id="reserva-topo" />
          </div>
        </section>

        {/* a casa: foto vertical + texto + números */}
        <section className="secao casa" id="casa" aria-labelledby="t-casa">
          <div className="casa__fotos">
            <figure className="casa__f1" data-revela="foto" data-paralaxe="6">
              <Foto nome="fachada-02-hd" sizes="(min-width: 900px) 34vw, 92vw" />
            </figure>
            <figure className="casa__f2" data-revela="foto" data-paralaxe="6" data-flutua="70" style={{ '--atraso': '0.2s' }}>
              <Foto nome="patio-02" sizes="(min-width: 900px) 18vw, 45vw" />
            </figure>
          </div>
          <div className="casa__texto">
            <Cabecalho id="t-casa" kicker="A Casa" titulo="Uma casa antiga, tratada com cuidado." />
            <p className="corpo" data-revela>
              Paredes caiadas, molduras amarelas nas janelas, uma sala comum com a pedra à vista. A casa descreve-se
              em três palavras: <q>{CASA.charme}</q>.
            </p>
            <dl className="numeros" data-revela>
              <div><dt>Universidade a pé</dt><dd><Contador valor="150" /><small> m</small></dd></div>
              <div><dt>Área dos quartos</dt><dd><Contador valor="15–25" /><small> m²</small></dd></div>
              <div><dt>Português, inglês, espanhol e francês</dt><dd><Contador valor="4" /><small> idiomas</small></dd></div>
            </dl>
          </div>
        </section>

        <Quartos />

        {/* espaços comuns: fotos | divisões | texto; presa ao centro, a divisão muda com o scroll e as perspetivas rodam */}
        <Espacos />

        {/* comodidades + bom saber */}
        <section className="secao comodidades" id="comodidades" aria-labelledby="t-comodidades">
          <Cabecalho id="t-comodidades" centrado kicker="Ficar aqui" titulo="O que a casa tem" />
          {/* carrossel contínuo: a lista vai duplicada (a cópia escondida dos leitores de ecrã) e anda metade da largura
              em loop, sempre ao mesmo ritmo; para quando o rato está por cima */}
          <div className="comodidades__pista" data-revela>
            <ul className="comodidades__fila">
              {[...COMODIDADES, ...COMODIDADES].map(([ic, t, d], i) => (
                <li key={i} aria-hidden={i >= COMODIDADES.length || undefined}>
                  <span className="comodidades__icone"><Icone nome={ic} tamanho={22} /></span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bom-saber" data-revela>
            <h3>Bom saber</h3>
            <ul>
              {BOM_SABER.map(([ic, t]) => (
                <li key={t}><Icone nome={ic} tamanho={18} />{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* por perto: 4 locais a pé, lado a lado (Perto.jsx) */}
        <Perto
          cabecalho={<Cabecalho id="t-alta" kicker="Por perto" titulo="A Universidade fica a 150 metros." texto="O que se visita a pé a partir da casa." />}
        />

        {/* gatos — ponytail: confirmar com a dona antes de publicar (AFIR-GATOS) */}
        {/* é a secção que fica presa por baixo do cartão final (cortina) */}
        <section className="secao gatos" id="gatos" aria-labelledby="t-gatos" ref={gatos}>
          {/* dois gatos desenhados entram pela esquerda do ecrã e param em cima do cartão (Gatos.jsx) */}
          <Gatos />
          <div className="gatos__cartao" data-revela>
            <div>
              <h2 id="t-gatos">{GATOS.frase}</h2>
              <p>Os animais dos hóspedes também são bem-vindos, mediante pedido e sem custo.</p>
            </div>
            <Opiniao c={C.hostess} className="opiniao--plana" />
          </div>
        </section>

        {/* reservar: cartão escuro com fotografia; ao entrar no ecrã cresce até às bordas, como a capa */}
        <section className="fim" id="reserva" aria-labelledby="t-reserva" ref={fim.fim}>
          <div className="fim__fundo">
            <div className="fim__movel" ref={fim.foto}><Foto nome="fachada-03-hd" sizes="100vw" alt="" /></div>
          </div>
          <div className="fim__conteudo">
            <div className="fim__kicker" data-revela>Reservar</div>
            <h2 id="t-reserva" data-revela>Reserve a sua estadia na Alta.</h2>
            <p data-revela>Escolha as datas e veja os quartos livres. A reserva confirma-se no Booking.</p>
            <BarraReserva />
            <ul className="fim__horas">
              <li><Icone nome="entrada" tamanho={16} />Check-in 15:00–22:00</li>
              <li><Icone nome="saida" tamanho={16} />Check-out até às 11:00</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="rodape__topo">
          <div className="rodape__marca">Pátio da Gata</div>
          <nav aria-label="Rodapé">
            <ul>
              {SECOES.slice(1).map(([id, t]) => <li key={id}><a href={`#${id}`}>{t}</a></li>)}
            </ul>
          </nav>
        </div>
        <div className="rodape__base">
          <p>Travessa de São Salvador, 3000-374 Coimbra</p>
          <p>Alojamento Local {CASA.registos}</p>
          <p><a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener">Livro de Reclamações</a></p>
        </div>
      </footer>
      <BarraMovel />
    </>
  );
}
