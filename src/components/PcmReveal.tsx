"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const STACK = ["COMIDA", "AÇO INOX 304", "PLACA PCM / GEL", "ISOLAMENTO"];

export default function PcmReveal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="relative overflow-hidden bg-background py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl font-bold sm:text-5xl"
          >
            O FRIO FICA <span className="text-gradient-cold">ESCONDIDO.</span>
          </motion.h2>
          <p className="mt-5 max-w-md text-sm text-muted sm:text-base">
            Na BASIC e na GO, o sistema de refrigeração fica escondido abaixo do recipiente —
            ele não aparece na parte superior da marmita durante o uso.
          </p>

          <button
            onClick={() => setRevealed((v) => !v)}
            className="mt-8 rounded-full border border-cold/60 px-6 py-3 text-sm font-semibold text-cold transition-all hover:scale-105 hover:bg-cold/10"
          >
            {revealed ? "OCULTAR" : "MOSTRAR COMO FUNCIONA"}
          </button>

          <AnimatePresence>
            {revealed && (
              <motion.ol
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 space-y-3 overflow-hidden"
              >
                {STACK.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-center gap-3 text-sm font-semibold tracking-wide"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-xs text-muted">
                      {i + 1}
                    </span>
                    {item}
                    {i === 2 && (
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="h-2 w-2 rounded-full bg-cold shadow-[0_0_12px_3px_rgba(47,180,255,0.6)]"
                      />
                    )}
                  </motion.li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          animate={revealed ? { scale: 1.06 } : { scale: 1 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <Image
            src="/images/tempbox/06_cutaway_basic_go-v2.png"
            alt="Corte interno mostrando a placa PCM escondida sob o inox"
            fill
            sizes="(max-width: 1024px) 90vw, 480px"
            className="object-contain"
          />
          {revealed && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="pointer-events-none absolute inset-x-8 bottom-16 h-10 rounded-full bg-cold/40 blur-2xl"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
