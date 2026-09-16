"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const COPY = {
  hot: "Aquecimento do compartimento.",
  cold: "Resfriamento do compartimento.",
  none: "Um lado quente. Um lado frio. Um produto só.",
};

export default function ProblemSolution() {
  const [side, setSide] = useState<"hot" | "cold" | null>(null);

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <motion.div
        aria-hidden
        animate={{ opacity: side ? 1 : 0.4 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,black_100%)]"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl font-bold sm:text-5xl"
        >
          UMA MARMITA.
          <br />
          DUAS TEMPERATURAS.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-md"
        >
          <div
            aria-hidden
            className="absolute -left-6 top-1/4 h-40 w-40 rounded-full bg-hot/25 blur-[80px] transition-opacity duration-500"
            style={{ opacity: side === "hot" ? 1 : side === "cold" ? 0.1 : 0.35 }}
          />
          <div
            aria-hidden
            className="absolute -right-6 top-1/4 h-40 w-40 rounded-full bg-cold/25 blur-[80px] transition-opacity duration-500"
            style={{ opacity: side === "cold" ? 1 : side === "hot" ? 0.1 : 0.35 }}
          />
          <Image
            src="/images/tempbox/25_final_product-v2.png"
            alt="TEMP BOX com lado quente e lado frio"
            fill
            sizes="(max-width: 768px) 90vw, 480px"
            className="object-contain"
          />
        </motion.div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => setSide(side === "hot" ? null : "hot")}
            className={`rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:scale-105 ${
              side === "hot" ? "border-hot bg-hot/10 text-hot" : "border-line text-muted"
            }`}
          >
            🔥 QUENTE
          </button>
          <button
            onClick={() => setSide(side === "cold" ? null : "cold")}
            className={`rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:scale-105 ${
              side === "cold" ? "border-cold bg-cold/10 text-cold" : "border-line text-muted"
            }`}
          >
            ❄️ FRIO
          </button>
        </div>

        <motion.p
          key={side ?? "none"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-sm text-muted"
        >
          {side ? COPY[side] : COPY.none}
        </motion.p>
      </div>
    </section>
  );
}
