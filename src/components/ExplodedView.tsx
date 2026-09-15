"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EXPLODED_PARTS } from "@/lib/tempbox-data";

// approximate hotspot positions over 05_exploded.png (percentages)
const POSITIONS: Record<string, { top: string; left: string }> = {
  tampa: { top: "14%", left: "62%" },
  recipientes: { top: "34%", left: "70%" },
  pcm: { top: "52%", left: "66%" },
  peltier: { top: "66%", left: "58%" },
  isolamento: { top: "78%", left: "68%" },
  base: { top: "90%", left: "62%" },
};

export default function ExplodedView() {
  const [active, setActive] = useState(EXPLODED_PARTS[0].id);
  const activePart = EXPLODED_PARTS.find((p) => p.id === active) ?? EXPLODED_PARTS[0];

  return (
    <section id="como-funciona" className="relative bg-background py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-3xl font-bold sm:text-5xl"
        >
          POR DENTRO DA TEMP BOX
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted sm:text-base">
          Cada componente cumpre uma função no equilíbrio entre os dois lados da marmita.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
          >
            <Image
              src="/images/tempbox/05_exploded-v2.png"
              alt="Vista explodida da TEMP BOX"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
            {EXPLODED_PARTS.map((part) => (
              <button
                key={part.id}
                onClick={() => setActive(part.id)}
                style={POSITIONS[part.id]}
                aria-label={part.label}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  className={`block h-3.5 w-3.5 rounded-full border transition-all ${
                    active === part.id
                      ? "border-hot bg-hot shadow-[0_0_0_6px_rgba(255,90,31,0.25)]"
                      : "border-foreground/60 bg-background/60 group-hover:border-hot"
                  }`}
                />
              </button>
            ))}
          </motion.div>

          <div className="space-y-2">
            {EXPLODED_PARTS.map((part) => (
              <button
                key={part.id}
                onClick={() => setActive(part.id)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition-all ${
                  active === part.id
                    ? "border-hot/60 bg-surface"
                    : "border-line bg-surface/40 hover:border-foreground/30"
                }`}
              >
                <span className="text-sm font-semibold sm:text-base">{part.label}</span>
                {active === part.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-sm text-muted"
                  >
                    {part.description}
                  </motion.p>
                )}
              </button>
            ))}
            <p className="pt-2 text-xs uppercase tracking-wide text-muted">
              {activePart.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
