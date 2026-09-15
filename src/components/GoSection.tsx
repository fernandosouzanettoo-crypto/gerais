"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GoSection() {
  return (
    <section id="go" className="relative overflow-hidden bg-surface py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl font-bold sm:text-5xl"
          >
            TEMP BOX GO
          </motion.h2>
          <p className="mt-3 text-lg font-semibold text-muted">
            Menor. Mais leve. Mais portátil.
          </p>
          <p className="mt-5 max-w-md text-sm text-muted sm:text-base">
            Mesmo conceito térmico da BASIC em um corpo mais compacto — pensada para acompanhar
            você, não para ficar para trás.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {["🔥 Aquecimento", "❄️ PCM/GEL", "🔌 USB-C", "📦 Tamanho compacto"].map((f) => (
              <span key={f} className="rounded-full border border-line px-4 py-2">
                {f}
              </span>
            ))}
          </div>

          <p className="mt-8 font-display text-xl font-semibold text-foreground">
            &ldquo;Feita para acompanhar você.&rdquo;
          </p>

          <a
            href="#go-size"
            className="mt-8 inline-flex rounded-full border border-line px-6 py-3 text-sm font-semibold transition-all hover:scale-105 hover:border-foreground/40"
          >
            VER COMPARAÇÃO DE TAMANHO ↓
          </a>
        </div>

        <motion.div
          id="go-size"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto aspect-[4/3] w-full max-w-lg"
        >
          <Image
            src="/images/tempbox/10_size_comparison-v2.png"
            alt="Comparação de tamanho entre GO e BASIC"
            fill
            sizes="(max-width: 1024px) 90vw, 560px"
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
