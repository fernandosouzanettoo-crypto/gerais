"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const HOT_MIN = 40;
const HOT_MAX = 80;
const HOT_DEFAULT = 65;
const COLD_MIN = 2;
const COLD_MAX = 15;
const COLD_DEFAULT = 5;

export default function TemperatureControl() {
  const [hot, setHot] = useState(HOT_DEFAULT);
  const [cold, setCold] = useState(COLD_DEFAULT);

  const hotIntensity = (hot - HOT_MIN) / (HOT_MAX - HOT_MIN);
  const coldIntensity = 1 - (cold - COLD_MIN) / (COLD_MAX - COLD_MIN);

  return (
    <div className="rounded-3xl border border-line bg-surface-2 p-6 sm:p-8">
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div className="relative overflow-hidden rounded-2xl bg-black/60 p-5 text-center">
          <motion.div
            aria-hidden
            animate={{ opacity: 0.15 + hotIntensity * 0.35 }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hot to-transparent"
          />
          <p className="relative text-xs font-semibold tracking-wide text-hot/80">LADO QUENTE</p>
          <motion.p
            key={hot}
            initial={{ opacity: 0.4, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative mt-2 font-display text-4xl font-bold text-hot sm:text-5xl"
          >
            {hot}°C
          </motion.p>
          <span className="relative mt-1 block text-lg">🔥</span>
          <div className="relative mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setHot((v) => Math.max(HOT_MIN, v - 1))}
              aria-label="Diminuir temperatura quente"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hot/50 text-hot transition-transform hover:scale-110 active:scale-95 disabled:opacity-30"
              disabled={hot <= HOT_MIN}
            >
              −
            </button>
            <button
              onClick={() => setHot((v) => Math.min(HOT_MAX, v + 1))}
              aria-label="Aumentar temperatura quente"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hot/50 text-hot transition-transform hover:scale-110 active:scale-95 disabled:opacity-30"
              disabled={hot >= HOT_MAX}
            >
              +
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-black/60 p-5 text-center">
          <motion.div
            aria-hidden
            animate={{ opacity: 0.15 + coldIntensity * 0.35 }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cold to-transparent"
          />
          <p className="relative text-xs font-semibold tracking-wide text-cold/80">LADO FRIO</p>
          <motion.p
            key={cold}
            initial={{ opacity: 0.4, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative mt-2 font-display text-4xl font-bold text-cold sm:text-5xl"
          >
            {cold}°C
          </motion.p>
          <span className="relative mt-1 block text-lg">❄️</span>
          <div className="relative mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setCold((v) => Math.max(COLD_MIN, v - 1))}
              aria-label="Diminuir temperatura fria"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cold/50 text-cold transition-transform hover:scale-110 active:scale-95 disabled:opacity-30"
              disabled={cold <= COLD_MIN}
            >
              −
            </button>
            <button
              onClick={() => setCold((v) => Math.min(COLD_MAX, v + 1))}
              aria-label="Aumentar temperatura fria"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cold/50 text-cold transition-transform hover:scale-110 active:scale-95 disabled:opacity-30"
              disabled={cold >= COLD_MAX}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setHot(HOT_DEFAULT);
          setCold(COLD_DEFAULT);
        }}
        className="mt-6 w-full rounded-full border border-line py-3 text-xs font-semibold tracking-wide text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
      >
        RESETAR
      </button>
    </div>
  );
}
