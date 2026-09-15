"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";

const DETAILS = [
  { id: "vedacao", label: "Vedação em silicone", image: "/images/tempbox/detail_vedacao.png", info: "Vedação em silicone garante fechamento firme entre os compartimentos e a tampa." },
  { id: "pcm", label: "Placa PCM/GEL", image: "/images/tempbox/12_pcm_plate-v2.png", info: "Mantém alimentos frescos por horas, escondida sob o recipiente de inox." },
  { id: "recipientes", label: "Recipientes removíveis", image: "/images/tempbox/13_removable_containers-v2.png", info: "Em aço inox 304, removíveis para facilitar a limpeza." },
  { id: "usb", label: "Entrada USB-C", image: "/images/tempbox/14_usb_c-v2.png", info: "Alimenta o sistema térmico da GO e da PRO." },
  { id: "base", label: "Base antiderrapante", image: "/images/tempbox/15_bottom_view-v2.png", info: "Estrutura estável, pensada para transporte no dia a dia." },
];

function DetailCard({
  detail,
  index,
  isActive,
  onToggle,
}: {
  detail: (typeof DETAILS)[number];
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>();

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onToggle}
      className="group perspective-1200 text-left"
    >
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          transform: "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(0)",
        }}
        className="tilt-glow preserve-3d relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface will-change-transform"
      >
        <Image
          src={detail.image}
          alt={detail.label}
          fill
          sizes="(max-width: 640px) 45vw, 200px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span
          className={`absolute right-2 top-2 z-[2] h-3 w-3 rounded-full border transition-colors ${
            isActive ? "border-hot bg-hot" : "border-white/60 bg-white/10"
          }`}
        />
      </div>
      <p className="mt-3 text-sm font-semibold">{detail.label}</p>
      {isActive && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-1 text-xs text-muted"
        >
          {detail.info}
        </motion.p>
      )}
    </motion.button>
  );
}

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
            <DetailCard
              key={d.id}
              detail={d}
              index={i}
              isActive={active === d.id}
              onToggle={() => setActive(active === d.id ? null : d.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
