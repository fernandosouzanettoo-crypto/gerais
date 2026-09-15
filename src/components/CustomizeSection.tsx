"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ANGLE_VIEWS, COLORS } from "@/lib/tempbox-data";

export default function CustomizeSection() {
  const [angleIndex, setAngleIndex] = useState(0);
  const [colorId, setColorId] = useState(COLORS[0].id);
  const dragStartX = useRef<number | null>(null);
  const dragStartIndex = useRef(0);

  const color = COLORS.find((c) => c.id === colorId) ?? COLORS[0];

  const step = (dir: 1 | -1) => {
    setAngleIndex((i) => (i + dir + ANGLE_VIEWS.length) % ANGLE_VIEWS.length);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragStartIndex.current = angleIndex;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    const steps = Math.round(delta / 60);
    if (steps !== 0) {
      const next =
        (dragStartIndex.current - steps + ANGLE_VIEWS.length * 10) % ANGLE_VIEWS.length;
      setAngleIndex(next);
    }
  };

  const onPointerUp = () => {
    dragStartX.current = null;
  };

  return (
    <section id="galeria" className="relative bg-surface py-28">
      <div className="mx-auto max-w-5xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-3xl font-bold sm:text-5xl"
        >
          VEJA DE TODOS OS ÂNGULOS.
        </motion.h2>

        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          data-cursor-target
          className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-lg cursor-grab touch-pan-y select-none active:cursor-grabbing"
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl transition-colors duration-500"
            style={{ backgroundColor: color.swatch, mixBlendMode: "color", opacity: 0.9 }}
          />
          <motion.div
            key={ANGLE_VIEWS[angleIndex].id}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={ANGLE_VIEWS[angleIndex].image}
              alt={`TEMP BOX — vista ${ANGLE_VIEWS[angleIndex].label}`}
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-contain pointer-events-none"
              draggable={false}
            />
          </motion.div>

          <button
            onClick={() => step(-1)}
            aria-label="Ângulo anterior"
            className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full border border-line bg-background/70 p-2 backdrop-blur transition-transform hover:scale-110"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Próximo ângulo"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-line bg-background/70 p-2 backdrop-blur transition-transform hover:scale-110"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <p className="mt-4 text-center text-xs tracking-[0.2em] text-muted">
          ARRASTE PARA GIRAR · {ANGLE_VIEWS[angleIndex].label.toUpperCase()}
        </p>

        <div className="mt-14 flex flex-col items-center gap-5">
          <p className="text-sm font-semibold text-muted">{color.name.toUpperCase()}</p>
          <div className="flex items-center gap-4">
            {COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => setColorId(c.id)}
                aria-label={c.name}
                className={`h-9 w-9 rounded-full border-2 transition-all hover:scale-110 ${
                  colorId === c.id ? "border-foreground scale-110" : "border-line"
                }`}
                style={{ backgroundColor: c.swatch }}
              />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-md text-center text-xs text-muted">
          Galeria preparada para receber futuramente um modelo 3D real (GLB) por ângulo e por cor.
        </p>
      </div>
    </section>
  );
}
