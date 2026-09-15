"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const HOT_MIN = 40;
const HOT_MAX = 80;
const COLD_MIN = 2;
const COLD_MAX = 15;

export default function YouChooseSliders() {
  const [hot, setHot] = useState(65);
  const [cold, setCold] = useState(5);

  return (
    <section className="relative bg-surface py-28">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-10 font-display text-4xl font-bold sm:text-6xl"
        >
          <span className="text-hot">{hot}°C</span>
          <span className="text-cold">{cold}°C</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 font-display text-3xl font-bold sm:text-5xl"
        >
          VOCÊ ESCOLHE.
        </motion.h2>
        <p className="mt-4 text-sm text-muted sm:text-base">
          Seu alimento.
          <br className="sm:hidden" /> Sua temperatura. Seu controle.
        </p>

        <div className="mt-12 space-y-10 text-left">
          <div>
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-hot">
              <span>🔥 HOT</span>
              <span>{hot}°C</span>
            </div>
            <input
              type="range"
              min={HOT_MIN}
              max={HOT_MAX}
              value={hot}
              onChange={(e) => setHot(Number(e.target.value))}
              className="w-full accent-[var(--hot)]"
              aria-label="Temperatura do lado quente"
            />
            <div className="mt-1 flex justify-between text-xs text-muted">
              <span>{HOT_MIN}°C</span>
              <span>{HOT_MAX}°C</span>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-cold">
              <span>❄️ COLD</span>
              <span>{cold}°C</span>
            </div>
            <input
              type="range"
              min={COLD_MIN}
              max={COLD_MAX}
              value={cold}
              onChange={(e) => setCold(Number(e.target.value))}
              className="w-full accent-[var(--cold)]"
              aria-label="Temperatura do lado frio"
            />
            <div className="mt-1 flex justify-between text-xs text-muted">
              <span>{COLD_MIN}°C</span>
              <span>{COLD_MAX}°C</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
