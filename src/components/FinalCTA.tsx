"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FinalCTA() {
  const [hover, setHover] = useState(false);

  return (
    <section className="relative overflow-hidden bg-black py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative h-40 w-64 sm:h-52 sm:w-80"
        >
          <Image src="/images/tempbox/02_closed-v2.png" alt="TEMP BOX" fill sizes="320px" className="object-contain" />
          <motion.span
            animate={{ opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-[28%] top-[38%] text-xl"
          >
            🔥
          </motion.span>
          <motion.span
            animate={{ opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute right-[28%] top-[38%] text-xl"
          >
            ❄️
          </motion.span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 font-display text-3xl font-bold sm:text-5xl"
        >
          TEMP <span className="text-hot">BOX</span>
        </motion.h2>
        <p className="mt-2 font-display text-base font-semibold text-muted sm:text-xl">
          TWO TEMPERATURES. ONE MEAL.
        </p>

        <a
          href="#lista-espera"
          className="mt-10 rounded-full bg-hot px-8 py-4 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-hot-glow"
        >
          ENTRE PARA A LISTA
        </a>
      </div>
    </section>
  );
}
