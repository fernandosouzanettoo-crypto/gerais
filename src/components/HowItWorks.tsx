"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EXPLODED_PARTS } from "@/lib/tempbox-data";

const POSITIONS: Record<string, { top: string; left: string }> = {
  tampa: { top: "14%", left: "62%" },
  recipientes: { top: "36%", left: "70%" },
  pcm: { top: "56%", left: "64%" },
  peltier: { top: "72%", left: "56%" },
  isolamento: { top: "86%", left: "66%" },
};

export default function HowItWorks() {
  const [active, setActive] = useState(EXPLODED_PARTS[0].id);
  const activePart = EXPLODED_PARTS.find((p) => p.id === active) ?? EXPLODED_PARTS[0];

  return (
    <section id="como-funciona" className="relative bg-background py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-2xl font-bold sm:text-4xl"
        >
          COMO FUNCIONA
        </motion.h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm"
          >
            <Image
              src="/images/tempbox/05_exploded-v2.png"
              alt="Vista explodida da TEMP BOX"
              fill
              sizes="(max-width: 1024px) 85vw, 420px"
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
                  className={`block h-3 w-3 rounded-full border transition-all ${
                    active === part.id
                      ? "border-hot bg-hot shadow-[0_0_0_5px_rgba(255,90,31,0.25)]"
                      : "border-foreground/60 bg-background/60 group-hover:border-hot"
                  }`}
                />
              </button>
            ))}
          </motion.div>

          <div className="space-y-1.5">
            {EXPLODED_PARTS.map((part) => (
              <button
                key={part.id}
                onClick={() => setActive(part.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                  active === part.id ? "border-hot/60 bg-surface" : "border-line bg-surface/40 hover:border-foreground/30"
                }`}
              >
                <span className="text-sm font-semibold">{part.label}</span>
                {active === part.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-1.5 text-xs text-muted"
                  >
                    {part.description}
                  </motion.p>
                )}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only">{activePart.label}</p>
      </div>
    </section>
  );
}
