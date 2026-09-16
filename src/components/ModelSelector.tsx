"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MODELS, type ModelId } from "@/lib/tempbox-data";
import { useTilt } from "@/hooks/useTilt";
import ProControl from "./ProControl";

function ProductCard({ modelId }: { modelId: ModelId }) {
  const model = MODELS.find((m) => m.id === modelId)!;
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>();

  return (
    <div className="perspective-1200">
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ transform: "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(0)" }}
        className="tilt-glow preserve-3d relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-surface will-change-transform"
      >
        <Image
          src={model.image}
          alt={model.name}
          fill
          sizes="(max-width: 1024px) 85vw, 420px"
          className="object-contain p-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        />
      </div>
    </div>
  );
}

export default function ModelSelector() {
  const [selected, setSelected] = useState<ModelId>("basic");
  const model = MODELS.find((m) => m.id === selected)!;

  return (
    <section id="modelos" className="relative bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-2xl font-bold sm:text-4xl"
        >
          ESCOLHA SUA TEMP BOX
        </motion.h2>

        <div className="mx-auto mt-8 flex max-w-xs justify-center rounded-full border border-line bg-background p-1">
          {MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-all ${
                selected === m.id ? "bg-hot text-black" : "text-muted hover:text-foreground"
              }`}
            >
              {m.id.toUpperCase()}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mt-12"
          >
            {selected === "pro" ? (
              <ProControl />
            ) : (
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <ProductCard modelId={selected} />
                <div className="text-center lg:text-left">
                  <h3 className="font-display text-2xl font-bold">{model.name}</h3>
                  <p className="mt-2 text-base font-semibold text-muted">{model.tagline}</p>
                  <p className="mx-auto mt-4 max-w-sm text-sm text-muted lg:mx-0">{model.description}</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                    {model.features.map((f) => (
                      <span key={f} className="rounded-full border border-line px-3.5 py-1.5 text-xs text-foreground/90">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
