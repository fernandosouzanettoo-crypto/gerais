"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const DETAILS = [
  { id: "vedacao", label: "Vedação em silicone", image: "/images/tempbox/detail_vedacao.png", info: "Vedação em silicone garante fechamento firme entre os compartimentos e a tampa." },
  { id: "pcm", label: "Placa PCM/GEL", image: "/images/tempbox/12_pcm_plate-v2.png", info: "Mantém alimentos frescos por horas, escondida sob o recipiente de inox." },
  { id: "recipientes", label: "Recipientes removíveis", image: "/images/tempbox/13_removable_containers-v2.png", info: "Em aço inox 304, removíveis para facilitar a limpeza." },
  { id: "usb", label: "Entrada USB-C", image: "/images/tempbox/14_usb_c-v2.png", info: "Alimenta o sistema térmico da GO e da PRO." },
  { id: "base", label: "Base antiderrapante", image: "/images/tempbox/15_bottom_view-v2.png", info: "Estrutura estável, pensada para transporte no dia a dia." },
];

export default function ProductDetails() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative bg-background py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-3xl font-bold sm:text-5xl"
        >
          DETALHES QUE FAZEM A DIFERENÇA
        </motion.h2>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {DETAILS.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setActive(active === d.id ? null : d.id)}
              className="group text-left"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src={d.image}
                  alt={d.label}
                  fill
                  sizes="(max-width: 640px) 45vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span
                  className={`absolute right-2 top-2 h-3 w-3 rounded-full border transition-colors ${
                    active === d.id ? "border-hot bg-hot" : "border-white/60 bg-white/10"
                  }`}
                />
              </div>
              <p className="mt-3 text-sm font-semibold">{d.label}</p>
              {active === d.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 text-xs text-muted"
                >
                  {d.info}
                </motion.p>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
