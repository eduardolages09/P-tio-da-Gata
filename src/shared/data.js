// Conteúdo da landing. Tudo vem de dossie/contrato.json (usos "afirmar", "afirmar_com_condicao",
// "citar"). Não acrescentar factos que não estejam lá. O nome da anfitriã não aparece de propósito.

export const CONFIG = {
  bookingUrl: 'https://www.booking.com/hotel/pt/patio-da-gata.pt-pt.html',
  // ponytail: número por confirmar com a dona (RNT e Google não batem certo). null = botão desativado.
  whatsapp: null,
  maxPessoas: 4, // 2 por quarto; acima disso abre mais de um quarto no Booking
};

// AFIR-NOTA-BK / AFIR-NOTA-G — mostrar sempre com fonte, escala e data.
export const NOTAS = {
  data: 'setembro de 2026',
  booking: { nota: '8,8', escala: '10', total: 148, funcionarios: '9,8', limpeza: '9,6' },
  google: { nota: '4,8', escala: '5', total: 5 },
};

// Casa: texto da própria casa (perfil do anfitrião no Booking). CIT-VARANDA-CASA, INSP-PATIO.
export const CASA = {
  nome: 'Pátio da Gata',
  onde: 'Travessa de São Salvador · Alta de Coimbra',
  registos: '85838/AL · 85843/AL',
  varanda: 'No piso superior, uma varanda ensolarada oferece um ambiente ainda mais acolhedor para começar ou terminar o dia.',
  nomeNaoPorAcaso: 'O nome não é por acaso.',
  charme: 'simplicidade, charme e funcionalidade',
};

// Arredores que a própria casa nomeia ("Informação da área circundante").
// As distâncias são as calculadas pelo Booking (a pé, OpenStreetMap) — mostrar a nota de fonte.
export const ARREDORES = [
  { nome: 'Paço Episcopal (Museu Machado de Castro)', dist: '100 m' },
  { nome: 'Universidade de Coimbra', dist: '150 m' },
  { nome: 'Rua da Sofia', dist: '600 m' },
  { nome: 'Aqueduto de São Sebastião', dist: '650 m' },
  { nome: 'Mosteiro de Santa Clara-a-Velha', dist: '1,4 km' },
];
export const ARREDORES_FONTE = 'Distâncias a pé calculadas pelo Booking.';
// Secção "Por perto": 4 locais de ARREDORES com foto (fotos-externas/CREDITOS.md). A distância é a do Booking;
// a descrição é informação geral sobre o monumento (não vem do dossiê da casa). O crédito da foto é obrigatório.
export const LOCAIS = [
  {
    nome: 'Museu Nacional Machado de Castro', dist: '100 m', foto: 'perto-museu-02', pos: '72% 50%',
    texto: 'No antigo Paço Episcopal: escultura, pintura e, por baixo, o criptopórtico romano da cidade.',
    // foto enviada pelo cliente em 2026-09-29: autor e licença por confirmar (fotos-externas/CREDITOS.md)
    credito: null,
  },
  {
    nome: 'Universidade de Coimbra', dist: '150 m', foto: 'perto-universidade-03',
    texto: 'O Paço das Escolas, a torre e a Biblioteca Joanina. Património Mundial da UNESCO.',
    // foto escolhida pelo cliente: Falco, no Pixabay (fotos-externas/CREDITOS.md)
    credito: { autor: 'Falco', lic: 'Pixabay', url: 'https://pixabay.com/users/falco-81448/' },
  },
  {
    nome: 'Aqueduto de São Sebastião', dist: '650 m', foto: 'perto-aqueduto-02', pos: '58% 50%',
    texto: 'Os Arcos do Jardim, do século XVI, a caminho do Jardim Botânico.',
    // foto enviada pelo cliente em 2026-09-29: autor e licença por confirmar (fotos-externas/CREDITOS.md)
    credito: null,
  },
  {
    nome: 'Mosteiro de Santa Clara-a-Velha', dist: '1,4 km', foto: 'perto-santa-clara-02', pos: '26% 50%',
    texto: 'Mosteiro gótico do outro lado do Mondego, resgatado às cheias do rio.',
    // foto enviada pelo cliente em 2026-09-29: autor e licença por confirmar (fotos-externas/CREDITOS.md)
    credito: null,
  },
];
export const ARREDORES_CASA = ['Universidade de Coimbra', 'Jardim Botânico', 'Museu Nacional de Machado de Castro', 'Mosteiro de Santa Cruz', 'Portugal dos Pequenitos'];

// AFIR-TQ-* — factos por tipo (Booking). Fotos não estão atribuídas com certeza a nenhum tipo.
export const QUARTOS = [
  { codigo: '1401', nome: 'Duplo com varanda', m2: 18, camas: 'cama de casal', nota: 'varanda com vista para a cidade' },
  { codigo: '1404', nome: 'Duplo amplo', m2: 23, camas: 'cama de casal', nota: 'vista para a cidade, secretária e mesa' },
  { codigo: '1402', nome: 'Duplo', m2: 23, camas: 'cama de casal', nota: 'vista para a cidade' },
  { codigo: '1403', nome: 'Duplo ou twin', m2: 18, camas: 'duas camas individuais', nota: 'vista para rua sossegada' },
  { codigo: '1406', nome: 'Duplo', m2: 18, camas: 'cama de casal', nota: 'vista para rua sossegada e mesa' },
  { codigo: '1405', nome: 'Duplo', m2: 15, camas: 'cama de casal', nota: 'vista para a cidade' },
  { codigo: '1407', nome: 'Duplo + individual', m2: 15, camas: 'casal + individual', nota: 'vista para a cidade e secretária' },
  { codigo: '1408', nome: 'Duplo', m2: 25, camas: 'cama de casal', nota: 'frigorífico, chaleira e zona de refeições' },
];

// Galeria de cada tipo no Booking (dossie/quartos.md, marketing/fotos.md), a primeira é a capa do cartão.
// ponytail: o Booking associa estas fotos a cada tipo, mas a dona ainda não confirmou que quarto é qual.
export const GALERIAS = {
  '1401': ['quarto-08', 'quarto-10', 'quarto-09', 'quarto-11', 'quarto-12', 'quarto-13', 'casa-de-banho-03', 'casa-de-banho-04'],
  '1404': ['quarto-24', 'quarto-22', 'quarto-23', 'casa-de-banho-07', 'casa-de-banho-08'],
  '1402': ['quarto-14', 'quarto-16', 'quarto-17', 'quarto-15', 'casa-de-banho-05'],
  '1403': ['quarto-18', 'quarto-20', 'quarto-21', 'quarto-19', 'casa-de-banho-06'],
  '1406': ['quarto-05', 'quarto-06', 'quarto-28', 'quarto-29', 'quarto-03', 'detalhe-01', 'casa-de-banho-01', 'casa-de-banho-02'],
  '1405': ['quarto-25', 'quarto-26', 'quarto-27', 'casa-de-banho-08'],
  '1407': ['quarto-01', 'quarto-07', 'quarto-02', 'quarto-04', 'casa-de-banho-02'],
  '1408': ['quarto-30', 'quarto-31', 'quarto-32', 'casa-de-banho-09'],
};

// Factos da casa (AFIR-*).
export const FACTOS = [
  { t: 'Casa de banho privativa', d: 'em todos os quartos, com duche' },
  { t: 'Cozinha e sala comuns', d: 'cozinha equipada e sala de estar' },
  { t: 'Wi-Fi gratuito', d: 'em toda a casa' },
  { t: 'Animais bem-vindos', d: 'mediante pedido, sem custo' },
  { t: 'Check-in', d: 'das 15:00 às 22:00' },
  { t: 'Check-out', d: 'até às 11:00' },
];

// Citações literais (contrato: CIT-02…CIT-22). Tradução marcada como nossa.
const q = (id, texto, autor, origem, lingua, traducao) => ({ id, texto, autor, origem, lingua, traducao });
export const CITACOES = {
  melhor: q('B-040', 'The best place to stay in Coimbra.', 'Dorota', 'Booking · julho 2026', 'en', 'O melhor sítio para ficar em Coimbra.'),
  onze: q('B-085', 'Minha avaliação é de 10 + 1, ou seja, se pudesse, seria 11.', 'Ricardo', 'Booking · maio 2026', 'pt'),
  marca: q('G-004', 'A simpatia da anfitriã é a marca da casa.', 'Vera Quitério', 'Google · 2026', 'pt'),
  hostess: q('B-071', 'The most wonderful hostess. Kindest woman and adorable cats (2!)', 'Julia', 'Booking · junho 2026', 'en', 'A anfitriã mais maravilhosa. A mulher mais amável, e gatos adoráveis (2!).'),
  bilhetes: q('B-018', 'She did her absolute best to be helpful, even upgrading us to a larger room, and she helped us out by getting our train tickets printed.', 'David', 'Booking · agosto 2026', 'en', 'Fez tudo para ajudar: mudou-nos para um quarto maior e imprimiu-nos os bilhetes de comboio.'),
  cafeteira: q('B-021', 'La amabilidad de la anfitriona que siempre tuvo una sonrisa para nosotros y cuando le dijimos que la cafetera estaba estropeada se esmeró en arreglarla en ese mismo momento.', 'Mar', 'Booking · agosto 2026', 'es', 'A anfitriã teve sempre um sorriso para nós; quando lhe dissemos que a cafeteira estava avariada, arranjou-a logo ali.'),
  galletas: q('G-005', 'Nos dejó agua y galletas en la habitación.', 'Laura Prados', 'Google · 2026', 'es', 'Deixou-nos água e bolachas no quarto.'),
  pe: q('B-028', 'La posizione è perfetta per visitare Coimbra a piedi, in pochi minuti puoi raggiungere tutti i luoghi principali e tornare in camera velocemente al bisogno.', 'Chiara', 'Booking · agosto 2026', 'it', 'A localização é perfeita para ver Coimbra a pé: em poucos minutos chega-se a tudo e volta-se ao quarto quando é preciso.'),
  museu: q('B-135', 'A localização é excelente mesmo ao lado do museu Machado de Castro e cinco minutos da Universidade.', 'Cristina', 'Booking · janeiro 2026', 'pt'),
  gem: q('B-095', 'A real hidden gem! Meticulously clean. Bed was comfortable.', 'Wai', 'Booking · maio 2026', 'en', 'Uma pérola escondida! Meticulosamente limpo. A cama era confortável.'),
  toalhas: q('B-083', 'Las toallas, grandes, blancas, impecables.', 'Marcela', 'Booking · maio 2026', 'es', 'As toalhas, grandes, brancas, impecáveis.'),
  elegancia: q('B-086', 'O quarto era excelente, mobilado com elegância, grande e muito soalheiro.', 'Monia', 'Booking · maio 2026', 'pt'),
  sono: q('B-096', 'The room is very well decorated the bed very comfortable, amazing sleep.', 'Stella', 'Booking · maio 2026', 'en', 'O quarto é muito bem decorado, a cama muito confortável; dormi lindamente.'),
  varanda: q('B-040', 'We stayed in a room with a big balcony, we used to sit in the evening after or before going to the old town that is just all around you.', 'Dorota', 'Booking · julho 2026', 'en', 'Tínhamos um quarto com uma varanda grande; sentávamo-nos lá ao fim do dia, antes ou depois de descer à cidade velha, que está toda à volta.'),
  atalaya: q('B-124', 'Una atalaya magnífica sobre Coímbra', 'Francisco', 'Booking · fevereiro 2026', 'es', 'Uma atalaia magnífica sobre Coimbra.'),
  charme: q('B-062', "It's a charming old building right by the university in the middle of the old town.", 'Nina', 'Booking · junho 2026', 'en', 'Um edifício antigo encantador, mesmo ao lado da universidade, no meio da cidade velha.'),
  cozinha: q('B-062', "There's nice kitchen in the ground floor, to cook for yourself or just make a tea, which I really appreciated.", 'Nina', 'Booking · junho 2026', 'en', 'Há uma cozinha simpática no rés-do-chão, para cozinhar ou só fazer um chá.'),
  casa: q('B-023', 'On s’y sent comme chez soi.', 'Philippe', 'Booking · agosto 2026', 'fr', 'Sentimo-nos em casa.'),
  zona: q('B-066', 'having a small separate living area was ideal for work, study and business trips', 'Collette', 'Booking · junho 2026', 'en', 'ter uma pequena sala à parte foi ideal para trabalho, estudo e viagens de negócios'),
  perra: q('B-020', 'Viajamos con una perra y agradecemos las facilidades que se nos han puesto, ella ha estado súper a gusto también!', 'Irene', 'Booking · agosto 2026', 'es', 'Viajámos com uma cadela e agradecemos as facilidades; ela também esteve super à vontade!'),
};

// Gestos reais da anfitriã, contados por hóspedes (pontos-fortes.md, ponto 1 e 8). Reescritos em
// linguagem neutra; cada um aponta para a review que o prova.
export const GESTOS = [
  { t: 'Recebe à chegada, mesmo tarde.', prova: 'B-062, B-063' },
  { t: 'Guarda as malas enquanto se passeia.', prova: 'B-028, B-040, B-115' },
  { t: 'Deixa água e bolachas no quarto.', prova: 'G-005, B-115, B-120' },
  { t: 'Dá o quarto antes da hora, quando pode.', prova: 'B-028, B-037, B-108' },
  { t: 'Indica onde estacionar e o que ver.', prova: 'B-022, B-085, B-120' },
  { t: 'Deixa mapas da Universidade e da cidade.', prova: 'B-066, B-068' },
];

// AFIR-GATOS — confirmar com a dona antes de publicar.
export const GATOS = {
  nomes: 'Bijoux e Chanel',
  frase: 'Na casa vivem dois gatos, Bijoux e Chanel.',
};

// Fotos: legendas descritivas (alt) a partir de dossie/marketing/fotos.md.
export const ALT = {
  'vista-01': 'Pôr do sol sobre os telhados de Coimbra, visto da casa',
  'alta-mondego-01': 'A Alta de Coimbra e a torre da Universidade vistas do Mondego, ao fim da tarde',
  'perto-museu-02': 'A loggia do Museu Machado de Castro: a fonte de pedra, as arcadas e a cidade ao fundo',
  'perto-santa-clara-02': 'A igreja gótica e as ruínas do Mosteiro de Santa Clara-a-Velha, com a Alta de Coimbra ao fundo',
  'perto-aqueduto-02': 'Os arcos de pedra do Aqueduto de São Sebastião, ao longo da rua, com céu azul',
  'perto-museu': 'Galeria de arcos do Museu Machado de Castro, com a cidade ao fundo',
  'perto-universidade': 'A torre e o Paço das Escolas da Universidade de Coimbra, céu azul',
  'perto-universidade-03': 'A Torre da Universidade de Coimbra, no Paço das Escolas, com céu de nuvens',
  'coimbra-entardecer-02': 'Coimbra ao pôr do sol: os telhados da Baixa, a cúpula da igreja e o Mondego',
  'coimbra-entardecer': 'Coimbra ao entardecer: a Alta com a torre da Universidade e o Mondego',
  'perto-universidade-02': 'A torre da Universidade de Coimbra e a escadaria da Via Latina, no Paço das Escolas',
  'perto-aqueduto': 'Os arcos de pedra do Aqueduto de São Sebastião, ao sol',
  'perto-santa-clara': 'As ruínas e a igreja gótica do Mosteiro de Santa Clara-a-Velha',
  'fachada-01': 'Fachada branca de quatro pisos com molduras amarelas, vista do pátio',
  'fachada-02': 'Parede caiada com janela redonda de moldura amarela e varanda de ferro',
  'patio-02': 'O pátio da casa: a calçada, a videira encostada à parede caiada e a porta envidraçada',
  'patio-01':'O pátio e um anexo de telhado vermelho, vistos de cima, com a cidade ao fundo',
  'sala-01': 'Sala comum com mesa de refeições e parede de pedra à vista',
  'sala-02': 'Sala comum com sofá, televisão e mesa de refeições',
  'refeicoes-01': 'Mesa de refeições na cozinha comum, com parede de pedra',
  'cozinha-01': 'Cozinha comum com bancada, forno e chaleira',
  'cozinha-02': 'Bancada da cozinha comum com chaleira, torradeira e caixa do pão',
  'cozinha-03': 'Zona comum com frigorífico, mesa de refeições e sofá',
  'quarto-16': 'Armário antigo pintado de coral e duas cadeiras estofadas a condizer',
  'quarto-22': 'Quarto amplo com teto de madeira, mesa e duas janelas',
  'quarto-02': 'Mesa com duas cadeiras junto à janela de um quarto',
  'quarto-23': 'Mesa com cadeiras e plantas junto à janela, teto de madeira',
  'corredor-01': 'Corredor de entrada com chão de mosaico hidráulico',
  'detalhe-01': 'Prateleiras de madeira com plantas e espelho de moldura dourada',
  'quarto-10': 'Cama de casal com colcha florida e espelho antigo',
  'quarto-05': 'Cama de casal com colcha florida e candeeiros de parede',
  'quarto-01': 'Quarto com cama de casal e colcha cor de mostarda',
  'quarto-09': 'Quarto com teto de madeira e cama com colcha florida',
  'quarto-30': 'Cama de casal com colcha cor de ferrugem e gravura de Coimbra',
  'quarto-18': 'Quarto com cama individual, soalho antigo e janela de guilhotina',
  'quarto-24': 'Cama de casal com manta cinzenta e casa de banho ao fundo',
  'quarto-14': 'Cama de casal com almofadas cinzentas e pretas',
  'quarto-06': 'Cama de casal junto à janela, colcha florida',
  'quarto-31': 'Cama com colcha cor de ferrugem junto à janela',
  'casa-de-banho-02': 'Casa de banho com duche de vidro',
  'casa-de-banho-06': 'Casa de banho com azulejo azul-petróleo e duche',
  'quarto-08': "Cama de casal com colcha floral, porta branca",
  'quarto-11': "Cama de casal com colcha floral, prateleiras de madeira",
  'quarto-12': "Cama de casal com colcha floral, espelho antigo, cadeira branca",
  'quarto-13': "Roupeiro aberto com prateleiras de madeira",
  'casa-de-banho-03': "Casa de banho em mosaico verde-acinzentado, duche",
  'casa-de-banho-04': "Casa de banho em mosaico, sanita",
  'casa-de-banho-07': "Casa de banho em mosaico azul-petróleo, duche, sanita",
  'casa-de-banho-08': "Casa de banho em mosaico azul-petróleo, lavatório e sanita",
  'quarto-17': "Cama de casal com manta cinzenta, meia parede",
  'quarto-15': "Roupeiro aberto, televisão, espelho antigo no chão",
  'casa-de-banho-05': "Casa de banho em mosaico, duche e lavatório",
  'quarto-20': "Duas camas individuais, portas envidraçadas, soalho antigo",
  'quarto-21': "Duas camas individuais, porta para a casa de banho",
  'quarto-19': "Cama individual com manta verde-escura junto à janela",
  'quarto-28': "Mesa de madeira com duas cadeiras e quadro de Coimbra",
  'quarto-29': "Cama com manta cinzenta e espelho oval branco",
  'quarto-03': "Mesa de madeira com tabuleiro, chávenas e espelho oval branco",
  'casa-de-banho-01': "Casa de banho: lavatório, espelho, toalhas",
  'quarto-25': "Cama de casal com manta verde-escura e almofadas pretas",
  'quarto-26': "Cama de casal com manta verde-escura, espelho antigo",
  'quarto-27': "Quarto com janela de guilhotina, televisão, cama com manta verde-escura",
  'quarto-07': "Cama de casal com colcha mostarda, televisão na parede",
  'quarto-04': "Roupeiro aberto com prateleiras de madeira",
  'quarto-32': "Cama com colcha cor de ferrugem, prateleiras de madeira, janela",
  'casa-de-banho-09': "Casa de banho em mosaico cinzento, duche e sanita",
};
