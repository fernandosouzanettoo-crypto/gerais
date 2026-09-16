"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { USAGE_SCENES } from "@/lib/tempbox-data";

export default function UsageContext() {
  const [active, setActive] = useState(0);
  const scene = USAGE_SCENES[active];

  return (
    <section className="relative bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-2xl font-bold sm:text-4xl"
        >
          FEITA PARA SUA ROTINA
        </motion.h2>

        <div className="mt-8 flex justify-center gap-2">
          {USAGE_SCENES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold tracking-wide transition-all ${
                active === i ? "border-hot bg-hot/10 text-hot" : "border-line text-muted hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image src={scene.image} alt={scene.label} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-display text-xl font-bold sm:text-2xl">{scene.label}</p>
                <p className="mt-1 max-w-xs text-sm text-white/80">{scene.copy}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
