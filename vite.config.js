import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// O build (dist/index.html) abre com duplo clique, sem servidor: o browser bloqueia scripts
// externos em file://, por isso o JS e o CSS vão dentro do HTML, e os caminhos são relativos.
function abrirSemServidor() {
  return {
    name: 'abrir-sem-servidor',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html'];
      if (!html) return;
      // o salto para dist/ só faz sentido no index.html de origem
      let fonte = String(html.source)
        .replace(/\s*<!-- Aberto por duplo clique[^]*?-->/, '')
        .replace(/\s*<script data-so-fonte>[^]*?<\/script>/, '');
      for (const [nome, f] of Object.entries(bundle)) {
        const url = `./${nome}`;
        if (f.type === 'chunk' && f.isEntry) {
          const js = f.code.replace(/<\/script/gi, '<\\/script');
          fonte = fonte.replace(new RegExp(`<script[^>]*src="${url}"[^>]*></script>`), () => '');
          fonte = fonte.replace('</body>', () => `<script type="module">${js}</script>\n</body>`);
          delete bundle[nome];
        } else if (f.type === 'asset' && nome.endsWith('.css')) {
          fonte = fonte.replace(new RegExp(`<link[^>]*href="${url}"[^>]*>`), () => `<style>${f.source}</style>`);
          delete bundle[nome];
        }
      }
      // ficheiros de public/ referidos com caminho absoluto no index.html
      html.source = fonte.replace(/([" ])\/(img\/|favicon\.svg)/g, '$1./$2');
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), abrirSemServidor()],
});
