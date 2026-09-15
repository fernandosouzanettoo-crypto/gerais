export type ModelId = "basic" | "go" | "pro";

export interface ModelInfo {
  id: ModelId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  hasActiveCooling: boolean;
  hasDisplay: boolean;
  hasUsbC: boolean;
}

export const MODELS: ModelInfo[] = [
  {
    id: "basic",
    name: "TEMP BOX BASIC",
    tagline: "Controle térmico essencial.",
    description:
      "Aquecimento de um lado e placa de gelo/PCM escondida do outro. O essencial da TEMP BOX, sem complicação.",
    image: "/images/tempbox/02_closed-v2.png",
    features: ["Aquecimento", "Frio passivo com placa PCM/GEL", "24 × 17 cm"],
    hasActiveCooling: false,
    hasDisplay: false,
    hasUsbC: false,
  },
  {
    id: "go",
    name: "TEMP BOX GO",
    tagline: "Menor. Mais leve. Mais portátil.",
    description:
      "Mesmo conceito térmico da BASIC em um corpo mais compacto, pensado para caber na sua rotina — e na sua mochila.",
    image: "/images/tempbox/go_product.png",
    features: ["Aquecimento", "Frio passivo com placa PCM/GEL", "USB-C", "20 × 17 cm"],
    hasActiveCooling: false,
    hasDisplay: false,
    hasUsbC: true,
  },
  {
    id: "pro",
    name: "TEMP BOX PRO",
    tagline: "Tudo sob seu controle.",
    description:
      "Refrigeração ativa por módulo Peltier, controle independente das duas temperaturas e display de acompanhamento em tempo real.",
    image: "/images/tempbox/angles/frontal.png",
    features: [
      "Aquecimento",
      "Refrigeração ativa (Peltier)",
      "Controle de temperatura",
      "Display",
      "USB-C",
    ],
    hasActiveCooling: true,
    hasDisplay: true,
    hasUsbC: true,
  },
];

export type FeatureLevel = "no" | "yes" | "double";

export interface ComparisonRow {
  label: string;
  basic: FeatureLevel;
  go: FeatureLevel;
  pro: FeatureLevel;
}

export const COMPARISON: ComparisonRow[] = [
  { label: "Aquecimento", basic: "yes", go: "yes", pro: "yes" },
  { label: "Frio com PCM (passivo)", basic: "yes", go: "yes", pro: "no" },
  { label: "Frio ativo (Peltier)", basic: "no", go: "no", pro: "yes" },
  { label: "Controle de temperatura", basic: "no", go: "no", pro: "yes" },
  { label: "Display", basic: "no", go: "no", pro: "yes" },
  { label: "USB-C", basic: "no", go: "yes", pro: "yes" },
  { label: "Portabilidade", basic: "yes", go: "double", pro: "yes" },
];

export interface ColorOption {
  id: string;
  name: string;
  swatch: string;
}

export const COLORS: ColorOption[] = [
  { id: "preto-fosco", name: "Preto Fosco", swatch: "#1c1d1f" },
  { id: "cinza-titanio", name: "Cinza Titânio", swatch: "#9a9ea3" },
  { id: "verde-militar", name: "Verde Militar", swatch: "#5c6650" },
  { id: "bege-areia", name: "Bege Areia", swatch: "#cbb897" },
];

export interface LifestyleScene {
  id: string;
  label: string;
  copy: string;
  image: string;
}

export const LIFESTYLE_SCENES: LifestyleScene[] = [
  { id: "academia", label: "ACADEMIA", copy: "Leve sua refeição sem sair da sua rotina.", image: "/images/tempbox/16_gym-v2.png" },
  { id: "trabalho", label: "TRABALHO", copy: "Seu almoço completo onde você estiver.", image: "/images/tempbox/17_work-v2.png" },
  { id: "faculdade", label: "FACULDADE", copy: "Praticidade entre uma aula e outra.", image: "/images/tempbox/18_college-v2.png" },
  { id: "viagem", label: "VIAGEM", copy: "Temperatura ideal em qualquer lugar.", image: "/images/tempbox/19_travel-v2.png" },
];

export const ANGLE_VIEWS = [
  { id: "frontal", label: "Frontal", image: "/images/tempbox/angles/frontal.png" },
  { id: "superior", label: "Superior", image: "/images/tempbox/angles/superior.png" },
  { id: "lateral-direita", label: "Lateral direita", image: "/images/tempbox/angles/lateral-direita.png" },
  { id: "traseira", label: "Traseira", image: "/images/tempbox/angles/traseira.png" },
  { id: "lateral-esquerda", label: "Lateral esquerda", image: "/images/tempbox/angles/lateral-esquerda.png" },
  { id: "inferior", label: "Inferior", image: "/images/tempbox/angles/inferior.png" },
];

export interface ExplodedPart {
  id: string;
  label: string;
  description: string;
}

export const EXPLODED_PARTS: ExplodedPart[] = [
  { id: "tampa", label: "Tampa com vedação", description: "Fecha os dois compartimentos de forma independente e mantém a vedação em silicone." },
  { id: "recipientes", label: "Recipientes em inox 304", description: "Recipiente interno resistente, atóxico e fácil de limpar." },
  { id: "pcm", label: "Placa de gelo / PCM", description: "Mantém o lado frio gelado por horas, escondida sob o recipiente." },
  { id: "peltier", label: "Resistência / módulo Peltier", description: "Sistema térmico responsável pelo aquecimento e, na PRO, pela refrigeração ativa." },
  { id: "isolamento", label: "Isolamento térmico", description: "Barreira que impede a troca de calor entre os dois lados e com o ambiente." },
  { id: "base", label: "Base", description: "Estrutura que sustenta a eletrônica e o sistema térmico da TEMP BOX." },
];

export const FAQ_ITEMS = [
  {
    q: "Como funciona a TEMP BOX?",
    a: "A TEMP BOX tem dois compartimentos independentes: um lado usa resistência térmica para manter a comida quente, o outro usa uma placa de gelo/PCM (ou refrigeração ativa, na PRO) para manter os alimentos frescos.",
  },
  {
    q: "Qual a diferença entre Basic, Go e Pro?",
    a: "BASIC traz o essencial: aquecimento e frio passivo com placa PCM. GO tem o mesmo conceito em um corpo menor e mais portátil, com USB-C. PRO adiciona refrigeração ativa por módulo Peltier, controle independente de temperatura e display.",
  },
  {
    q: "Onde fica a placa de gelo?",
    a: "Ela fica escondida em um compartimento próprio, abaixo do recipiente de inox — não aparece na parte superior da marmita durante o uso.",
  },
  {
    q: "A placa fica escondida durante o uso?",
    a: "Sim. Na BASIC e na GO, o sistema de refrigeração passiva fica totalmente escondido abaixo do recipiente de alimentos.",
  },
  {
    q: "Como funciona o controle da PRO?",
    a: "A PRO tem um display com botões de + e - para cada lado, permitindo ajustar a temperatura de aquecimento e de refrigeração de forma independente, dentro de limites seguros de operação.",
  },
  {
    q: "As temperaturas são independentes?",
    a: "Sim. Os dois compartimentos operam de forma isolada um do outro, cada um com seu próprio sistema térmico.",
  },
  {
    q: "Os recipientes são removíveis?",
    a: "Sim, os recipientes internos em inox 304 podem ser removidos para facilitar a limpeza.",
  },
  {
    q: "Qual o material interno?",
    a: "Aço inox 304 nos recipientes internos, com isolamento térmico ao redor de cada compartimento.",
  },
  {
    q: "Como funciona o USB-C?",
    a: "A entrada USB-C é usada para alimentar o sistema térmico da GO e da PRO. Detalhes de autonomia ainda estão em desenvolvimento.",
  },
  {
    q: "Quando será o lançamento?",
    a: "Ainda não temos uma data oficial. Entre na lista de espera para ser avisado assim que o lançamento for confirmado.",
  },
];
