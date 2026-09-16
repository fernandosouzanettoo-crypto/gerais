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
    features: ["Aquecimento", "Frio passivo com placa PCM/GEL", "USB-C", "20 × 14 × 7 cm"],
    hasActiveCooling: false,
    hasDisplay: false,
    hasUsbC: true,
  },
  {
    id: "pro",
    name: "TEMP BOX PRO",
    tagline: "Tudo sob seu controle.",
    description:
      "Refrigeração ativa, controle independente das duas temperaturas e painel de controle próprio.",
    image: "/images/tempbox/angles/frontal.png",
    features: ["Aquecimento independente", "Refrigeração ativa", "Controle de temperatura", "Display"],
    hasActiveCooling: true,
    hasDisplay: true,
    hasUsbC: true,
  },
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
  { id: "peltier", label: "Resistência / módulo térmico", description: "Sistema responsável pelo aquecimento e, na PRO, pela refrigeração ativa." },
  { id: "isolamento", label: "Isolamento térmico", description: "Barreira que reduz a troca de calor entre os dois lados e com o ambiente." },
];

export interface Differential {
  icon: string;
  label: string;
}

export const DIFFERENTIALS: Differential[] = [
  { icon: "🔥", label: "Duas temperaturas" },
  { icon: "❄️", label: "Compartimentos independentes" },
  { icon: "🎒", label: "Portabilidade" },
  { icon: "🌡️", label: "Controle na PRO" },
];

export interface UsageScene {
  id: string;
  label: string;
  copy: string;
  image: string;
}

export const USAGE_SCENES: UsageScene[] = [
  { id: "trabalho", label: "TRABALHO", copy: "Seu almoço completo onde você estiver.", image: "/images/tempbox/17_work-v2.png" },
  { id: "academia", label: "ACADEMIA", copy: "Leve sua refeição sem sair da sua rotina.", image: "/images/tempbox/16_gym-v2.png" },
  { id: "rotina", label: "ROTINA", copy: "Cabe na mochila. Cabe no seu dia.", image: "/images/tempbox/19_travel-v2.png" },
];

export const FAQ_ITEMS = [
  {
    q: "Como funciona a TEMP BOX?",
    a: "A TEMP BOX tem dois compartimentos independentes: um lado usa resistência térmica para manter a comida quente, o outro usa uma placa de gelo/PCM (ou refrigeração ativa, na PRO) para manter os alimentos frescos.",
  },
  {
    q: "Qual a diferença entre Basic, Go e Pro?",
    a: "BASIC traz o essencial: aquecimento e frio passivo com placa PCM. GO tem o mesmo conceito em um corpo menor e mais portátil, com USB-C. PRO adiciona refrigeração ativa, controle independente de temperatura e display.",
  },
  {
    q: "Onde fica a placa de gelo?",
    a: "Ela fica escondida em um compartimento próprio, abaixo do recipiente de inox — não aparece na parte superior da marmita durante o uso.",
  },
  {
    q: "Como funciona o controle da PRO?",
    a: "A PRO tem um painel com controles para cada lado, permitindo ajustar a temperatura de aquecimento e de refrigeração de forma independente, dentro de limites seguros de demonstração.",
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
    q: "Quando será o lançamento?",
    a: "Ainda não temos uma data oficial. Entre na lista de espera para ser avisado assim que o lançamento for confirmado.",
  },
];
