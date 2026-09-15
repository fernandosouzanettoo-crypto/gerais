"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MODELS } from "@/lib/tempbox-data";
import { useTilt } from "@/hooks/useTilt";

function ModelCard({
  model,
  index,
  isSelected,
  isDimmed,
  onSelect,
  onDeselect,
}: {
  model: (typeof MODELS)[number];
  index: number;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>();

  return (
    <motion.a
      href={`#${model.id}`}
      onMouseEnter={onSelect}
      onMouseLeave={onDeselect}
      onFocus={onSelect}
      onBlur={onDeselect}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      animate={{
        scale: isSelected ? 1.05 : isDimmed ? 0.96 : 1,
        opacity: isDimmed ? 0.55 : 1,
      }}
      className="perspective-1200 block"
    >
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          transform: "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(0)",
        }}
        className="tilt-glow preserve-3d group relative flex flex-col items-center overflow-hidden rounded-2xl border border-line bg-surface p-8 text-center transition-shadow duration-300 will-change-transform hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        <motion.div
          animate={{ rotate: isSelected ? -4 : 0 }}
          transition={{ duration: 0.4 }}
          className="relative h-40 w-full sm:h-48"
        >
          <Image
            src={model.image}
            alt={model.name}
            fill
            sizes="(max-width: 640px) 90vw, 320px"
            className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
        <h3 className="mt-6 font-display text-xl font-bold">{model.name}</h3>
        <p className="mt-2 text-sm text-muted">{model.tagline}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-hot underline-anim">
          Ver detalhes →
        </span>
      </div>
    </motion.a>
  );
}

export default function ModelsShowcase() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="modelos" className="relative bg-background py-28">
      <div className="mx-auto max-w-6xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-3xl font-bold sm:text-5xl"
        >
          ESCOLHA SUA TEMP BOX
        </motion.h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted sm:text-base">
          Três formas de levar as suas duas temperaturas para onde você for.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {MODELS.map((model, i) => (
            <ModelCard
              key={model.id}
              model={model}
              index={i}
              isSelected={selected === model.id}
              isDimmed={selected !== null && selected !== model.id}
              onSelect={() => setSelected(model.id)}
              onDeselect={() => setSelected(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
