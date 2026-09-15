"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TemperatureControl from "./TemperatureControl";

export default function ProSection() {
  return (
    <section id="pro" className="relative bg-background py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-3xl font-bold sm:text-5xl"
        >
          TUDO SOB SEU CONTROLE.
        </motion.h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted sm:text-base">
          TEMP BOX PRO — refrigeração ativa por módulo Peltier e controle independente das duas
          temperaturas.
        </p>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <Image
              src="/images/tempbox/07_cutaway_pro-v2.png"
              alt="TEMP BOX PRO — corte interno"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          <div>
            <TemperatureControl />
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {["🔥 Aquecimento", "❄️ Refrigeração ativa", "🌡️ Controle independente", "📟 Display", "🔌 USB-C"].map(
                (f) => (
                  <span key={f} className="rounded-full border border-line px-4 py-2">
                    {f}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
