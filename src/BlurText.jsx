import { motion, useReducedMotion } from 'motion/react';

// Adaptado de React Bits — BlurText (https://reactbits.dev/text-animations/blur-text, MIT + Commons Clause).
// Diferenças: anima letra a letra dentro de grupos que não partem (no telemóvel cada grupo é uma
// linha), o elemento é escolhido com `as`, e com "reduzir movimento" o texto aparece logo.
// A palavra da capa está no topo do ecrã, por isso anima ao montar (sem IntersectionObserver).

const DE = { filter: 'blur(10px)', opacity: 0, y: -50 };
const PARA = { filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'], opacity: [0, 0.5, 1], y: [-50, 5, 0] };

export default function BlurText({ grupos, as: Tag = 'p', className = '', atraso = 60, duracao = 0.7, inicio = 0.1, ...resto }) {
  const semMovimento = useReducedMotion();
  let i = 0;
  return (
    <Tag className={className} {...resto}>
      {grupos.map((g, gi) => (
        <span key={gi} className="blur__grupo" aria-hidden="true">
          {[...g].map((letra, li) => {
            const n = i++;
            if (letra === ' ') return <span key={li} className="blur__letra">{' '}</span>;
            return (
              <motion.span
                key={li}
                className="blur__letra"
                initial={semMovimento ? false : DE}
                animate={semMovimento ? undefined : PARA}
                transition={{ duration: duracao, times: [0, 0.5, 1], delay: inicio + (n * atraso) / 1000 }}
              >
                {letra}
              </motion.span>
            );
          })}
          {gi < grupos.length - 1 ? <span className="blur__letra blur__espaco">{' '}</span> : null}
        </span>
      ))}
    </Tag>
  );
}
