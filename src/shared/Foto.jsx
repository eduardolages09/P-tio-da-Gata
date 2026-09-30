import fotos from './fotos.json';
import { ALT } from './data.js';

// <img> responsivo a partir de public/img (gerado por scripts/imagens.py).
// `sizes` descreve a largura na página; `prioridade` para a imagem do hero (sem lazy).
export default function Foto({ nome, sizes = '100vw', prioridade = false, className = '', alt, style }) {
  const f = fotos[nome];
  if (!f) throw new Error(`Foto desconhecida: ${nome}`);
  const srcSet = f.larguras.map((l) => `${import.meta.env.BASE_URL}img/${nome}-${l}.webp ${l}w`).join(', ');
  const media = f.larguras[Math.min(1, f.larguras.length - 1)];
  return (
    <img
      className={className}
      style={style}
      src={`${import.meta.env.BASE_URL}img/${nome}-${media}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={f.w}
      height={f.h}
      alt={alt ?? ALT[nome] ?? ''}
      loading={prioridade ? 'eager' : 'lazy'}
      fetchPriority={prioridade ? 'high' : undefined}
      decoding="async"
      draggable={false}
    />
  );
}
