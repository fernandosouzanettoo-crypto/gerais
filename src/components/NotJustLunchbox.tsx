"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = ["É liberdade.", "É praticidade.", "É controle."];

export default function NotJustLunchbox() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const p0 = useTransform(scrollYProgress, [0.28, 0.36, 0.48, 0.55], [0, 1, 1, 0]);
  const p1 = useTransform(scrollYProgress, [0.5, 0.58, 0.7, 0.77], [0, 1, 1, 0]);
  const p2 = useTransform(scrollYProgress, [0.72, 0.8, 1], [0, 1, 1]);
  const finalOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  return (
    <section ref={ref} className="relative h-[280vh] bg-background">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-5 text-center">
        <motion.h2 style={{ opacity: titleOpacity }} className="absolute font-display text-4xl font-bold leading-tight sm:text-6xl">
          NÃO É SÓ
          <br />
          UMA MARMITA.
        </motion.h2>

        <div className="relative h-16">
          <motion.p style={{ opacity: p0 }} className="absolute inset-x-0 font-display text-3xl font-bold sm:text-5xl">
            {LINES[0]}
          </motion.p>
          <motion.p style={{ opacity: p1 }} className="absolute inset-x-0 font-display text-3xl font-bold sm:text-5xl">
            {LINES[1]}
          </motion.p>
          <motion.p style={{ opacity: p2 }} className="absolute inset-x-0 font-display text-3xl font-bold sm:text-5xl">
            {LINES[2]}
          </motion.p>
        </div>

        <motion.p
          style={{ opacity: finalOpacity }}
          className="absolute bottom-[20%] font-display text-xl font-semibold text-muted sm:text-2xl"
        >
          TWO TEMPERATURES.
          <br />
          ONE MEAL.
        </motion.p>
      </div>
    </section>
  );
}
