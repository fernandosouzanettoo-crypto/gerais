"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PILLARS = [
  {
    id: "heat",
    icon: "🔥",
    title: "HEAT",
    color: "hot" as const,
    short: "Resistência térmica mantém a comida quente.",
    long: "Uma resistência aquece o compartimento por baixo, mantendo a refeição na temperatura ideal até a hora de comer.",
  },
  {
    id: "cold",
    icon: "❄️",
    title: "COLD",
    color: "cold" as const,
    short: "Placa PCM ou refrigeração ativa mantêm o frio.",
    long: "Na BASIC e na GO, uma placa de gelo/PCM escondida sob o recipiente mantém os alimentos frescos. Na PRO, um módulo Peltier faz a refrigeração ativa.",
  },
  {
    id: "control",
    icon: "🌡️",
    title: "CONTROL",
    color: "hot" as const,
    short: "A PRO permite ajustar cada lado de forma independente.",
    long: "Com display e botões dedicados, você define a temperatura de cada compartimento sem que um lado interfira no outro.",
  },
];

export default function TechnologySection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="tecnologia" className="relative bg-surface py-28">
      <div className="mx-auto max-w-5xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-3xl font-bold sm:text-5xl"
        >
          TECNOLOGIA QUE VOCÊ CONSEGUE ENTENDER.
        </motion.h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setOpen(open === p.id ? null : p.id)}
              className="rounded-2xl border border-line bg-background p-8 text-left transition-transform hover:scale-[1.03]"
            >
              <motion.span
                animate={p.id === "heat" ? { y: [0, -4, 0] } : p.id === "cold" ? { rotate: [0, 8, -8, 0] } : { scale: [1, 1.1, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="text-3xl"
              >
                {p.icon}
              </motion.span>
              <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.short}</p>
              {open === p.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-sm text-foreground/80"
                >
                  {p.long}
                </motion.p>
              )}
              <span className="mt-4 block text-xs font-semibold text-muted underline-anim">
                {open === p.id ? "fechar" : "saiba mais"}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
