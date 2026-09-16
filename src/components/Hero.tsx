"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<"hot" | "cold" | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // cinematic entrance + "disassembly" as user scrolls
  const productScale = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.92, 1.05, 1.22, 1.3]);
  const productRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 3, 0]);
  const productY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const closedOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 1, 0]);
  const openOpacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);

  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);

  const labelsOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);
  const vignette = useTransform(scrollYProgress, [0, 1], [0.15, 0.5]);

  // brief scroll-storytelling, one phrase at a time
  const story0 = useTransform(scrollYProgress, [0.2, 0.28, 0.4, 0.48], [0, 1, 1, 0]);
  const story1 = useTransform(scrollYProgress, [0.46, 0.54, 0.64, 0.72], [0, 1, 1, 0]);
  const story2 = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);

  return (
    <section id="top" ref={containerRef} className="relative h-[260vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ambient glow */}
        <motion.div
          aria-hidden
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black_100%)]"
        />
        <div
          aria-hidden
          className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-hot/20 blur-[100px] transition-opacity duration-700"
          style={{ opacity: hover === "hot" ? 0.9 : 0.35 }}
        />
        <div
          aria-hidden
          className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-cold/20 blur-[100px] transition-opacity duration-700"
          style={{ opacity: hover === "cold" ? 0.9 : 0.35 }}
        />

        {/* product */}
        <motion.div
          style={{ scale: productScale, rotate: productRotate, y: productY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative h-[46vh] w-[80vw] max-w-2xl sm:h-[52vh]">
            <motion.div style={{ opacity: closedOpacity }} className="absolute inset-0">
              <Image
                src="/images/tempbox/02_closed-v2.png"
                alt="TEMP BOX fechada"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 640px"
                className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
            <motion.div style={{ opacity: openOpacity }} className="absolute inset-0">
              <Image
                src="/images/tempbox/03_open-v2.png"
                alt="TEMP BOX aberta mostrando os dois compartimentos"
                fill
                sizes="(max-width: 768px) 90vw, 640px"
                className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* hero copy */}
        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="absolute inset-x-0 top-[12%] flex flex-col items-center px-5 text-center sm:top-[15%]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-bold tracking-tight sm:text-7xl"
          >
            TEMP <span className="text-hot">BOX</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 font-display text-xl font-semibold text-muted sm:text-2xl"
          >
            TWO TEMPERATURES. <span className="text-foreground">ONE MEAL.</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-4 max-w-md text-sm text-muted sm:text-base"
          >
            Mais que uma marmita. Liberdade na sua rotina.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#modelos"
              className="rounded-full bg-hot px-6 py-3 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-hot-glow"
            >
              CONHEÇA A TEMP BOX
            </a>
            <a
              href="#modelos"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-foreground transition-all hover:scale-105 hover:border-foreground"
            >
              VER MODELOS
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-9 flex items-center gap-8 text-sm"
          >
            <button
              onMouseEnter={() => setHover("hot")}
              onMouseLeave={() => setHover(null)}
              className="flex items-center gap-2 text-muted transition-colors hover:text-hot"
            >
              <span className="text-lg">🔥</span> HOT
            </button>
            <button
              onMouseEnter={() => setHover("cold")}
              onMouseLeave={() => setHover(null)}
              className="flex items-center gap-2 text-muted transition-colors hover:text-cold"
            >
              <span className="text-lg">❄️</span> COLD
            </button>
          </motion.div>
        </motion.div>

        {/* brief story line as the box opens */}
        <div className="absolute inset-x-0 bottom-[26%] h-8 px-5 text-center sm:bottom-[30%]">
          <motion.p style={{ opacity: story0 }} className="absolute inset-x-0 font-display text-lg font-semibold sm:text-2xl">
            DUAS TEMPERATURAS.
          </motion.p>
          <motion.p style={{ opacity: story1 }} className="absolute inset-x-0 font-display text-lg font-semibold sm:text-2xl">
            UM PRODUTO.
          </motion.p>
          <motion.p style={{ opacity: story2 }} className="absolute inset-x-0 font-display text-lg font-semibold sm:text-2xl">
            CRIADO PARA A SUA ROTINA.
          </motion.p>
        </div>

        {/* labels that appear once the box opens on scroll */}
        <motion.div
          style={{ opacity: labelsOpacity }}
          className="absolute inset-x-0 bottom-[12%] flex items-center justify-center gap-16 px-5 text-sm font-semibold sm:bottom-[16%]"
        >
          <span className="flex items-center gap-2 text-hot">🔥 QUENTE</span>
          <span className="flex items-center gap-2 text-cold">❄️ FRIO</span>
        </motion.div>

        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="absolute bottom-8 inset-x-0 flex justify-center"
        >
          <span className="animate-bounce text-xs tracking-[0.3em] text-muted">ROLE PARA EXPLORAR</span>
        </motion.div>
      </div>
    </section>
  );
}
