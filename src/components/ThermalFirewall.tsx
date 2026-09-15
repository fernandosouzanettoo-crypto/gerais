"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ThermalFirewall() {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl font-bold sm:text-5xl"
        >
          ISOLAMENTO QUE SEPARA OS DOIS LADOS.
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
          Uma barreira térmica impede que o calor de um lado interfira no frio do outro.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-14 aspect-[1059/338] w-full max-w-4xl"
        >
          <Image
            src="/images/tempbox/cutaway_labeled_wide.png"
            alt="Corte interno mostrando o isolamento térmico entre o lado quente e o lado frio"
            fill
            sizes="(max-width: 1024px) 95vw, 900px"
            className="object-contain"
          />

          {/* heat trying to cross, blocked at the center */}
          <motion.div
            aria-hidden
            animate={{ x: ["-10%", "38%", "-10%"], opacity: [0, 0.7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[30%] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-hot/50 blur-xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: ["10%", "-38%", "10%"], opacity: [0, 0.7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute right-[30%] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-cold/50 blur-xl"
          />
          <div className="absolute inset-y-[10%] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/40 to-transparent" />
        </motion.div>

        <p className="mx-auto mt-8 max-w-md text-xs text-muted">
          O isolamento térmico reduz a troca de calor entre os lados. A TEMP BOX não substitui boas
          práticas de segurança alimentar.
        </p>
      </div>
    </section>
  );
}
