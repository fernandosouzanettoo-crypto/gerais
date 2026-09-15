"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function BasicSection() {
  const [view, setView] = useState<"product" | "inside" | "how">("product");

  return (
    <section id="basic" className="relative bg-background py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative order-2 mx-auto aspect-square w-full max-w-md lg:order-1"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={view === "inside" ? "/images/tempbox/06_cutaway_basic_go-v2.png" : "/images/tempbox/02_closed-v2.png"}
                alt="TEMP BOX BASIC"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {view === "how" && (
            <>
              <motion.span
                animate={{ y: [-4, -20], opacity: [0.7, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="absolute left-[30%] top-[30%] text-2xl"
              >
                🔥
              </motion.span>
              <motion.span
                animate={{ y: [-4, -20], opacity: [0.7, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.5 }}
                className="absolute right-[30%] top-[30%] text-2xl"
              >
                ❄️
              </motion.span>
            </>
          )}
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl font-bold sm:text-5xl"
          >
            TEMP BOX BASIC
          </motion.h2>
          <p className="mt-3 text-lg font-semibold text-muted">Controle térmico essencial.</p>
          <p className="mt-5 max-w-md text-sm text-muted sm:text-base">
            Aquecimento de um lado, placa de gelo/PCM escondida do outro. O necessário para o seu
            dia a dia, sem complicação.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2 rounded-full border border-line px-4 py-2">🔥 Lado quente</span>
            <span className="flex items-center gap-2 rounded-full border border-line px-4 py-2">❄️ Placa PCM/GEL</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setView(view === "inside" ? "product" : "inside")}
              className="rounded-full bg-surface-2 border border-line px-6 py-3 text-sm font-semibold transition-all hover:scale-105 hover:border-foreground/40"
            >
              {view === "inside" ? "FECHAR" : "VER POR DENTRO"}
            </button>
            <button
              onClick={() => setView(view === "how" ? "product" : "how")}
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold transition-all hover:scale-105 hover:border-foreground/40"
            >
              VER COMO FUNCIONA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
