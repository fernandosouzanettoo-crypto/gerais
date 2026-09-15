"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const PHRASES = ["Comida quente.", "Alimentos frescos.", "Na mesma marmita."];

export default function HotColdSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const hotOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.15, 0.75, 0.75]);
  const coldOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.15, 0.75, 0.75]);
  const dividerScale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const p0 = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.38], [0, 1, 1, 0]);
  const p1 = useTransform(scrollYProgress, [0.38, 0.48, 0.62, 0.7], [0, 1, 1, 0]);
  const p2 = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);

  return (
    <section ref={ref} className="relative h-[280vh] bg-background">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden
          style={{ opacity: hotOpacity }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-hot/25 to-transparent"
        />
        <motion.div
          aria-hidden
          style={{ opacity: coldOpacity }}
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-cold/25 to-transparent"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: dividerScale }}
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line"
        />

        <h2 className="z-10 px-5 text-center font-display text-4xl font-bold leading-tight sm:text-6xl">
          UMA MARMITA.
          <br />
          DUAS TEMPERATURAS.
        </h2>

        <div className="relative z-10 mt-10 h-[30vh] w-[70vw] max-w-md sm:h-[36vh]">
          <Image
            src="/images/tempbox/25_final_product-v2.png"
            alt="TEMP BOX com lado quente e lado frio"
            fill
            sizes="(max-width: 768px) 80vw, 480px"
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mt-8 h-8 text-center">
          <motion.p style={{ opacity: p0 }} className="absolute inset-x-0 font-display text-2xl font-semibold text-hot">
            {PHRASES[0]}
          </motion.p>
          <motion.p style={{ opacity: p1 }} className="absolute inset-x-0 font-display text-2xl font-semibold text-cold">
            {PHRASES[1]}
          </motion.p>
          <motion.p style={{ opacity: p2 }} className="absolute inset-x-0 font-display text-2xl font-semibold text-foreground">
            {PHRASES[2]}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
