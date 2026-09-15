"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LIFESTYLE_SCENES } from "@/lib/tempbox-data";

export default function LifestyleSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(idx);
  };

  const scrollTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="relative bg-surface py-24">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
        className="px-5 text-center font-display text-3xl font-bold sm:text-5xl"
      >
        FEITA PARA SUA ROTINA
      </motion.h2>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="mt-12 flex snap-x snap-mandatory overflow-x-auto no-scrollbar"
      >
        {LIFESTYLE_SCENES.map((scene) => (
          <div key={scene.id} className="relative aspect-[16/9] w-full flex-none snap-center px-2 sm:px-4">
            <div className="relative h-full overflow-hidden rounded-3xl">
              <Image
                src={scene.image}
                alt={scene.label}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
                <p className="font-display text-2xl font-bold sm:text-4xl">{scene.label}</p>
                <p className="mt-2 max-w-xs text-sm text-white/80 sm:text-base">{scene.copy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {LIFESTYLE_SCENES.map((scene, i) => (
          <button
            key={scene.id}
            onClick={() => scrollTo(i)}
            aria-label={scene.label}
            className={`h-1.5 rounded-full transition-all ${
              active === i ? "w-8 bg-hot" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
