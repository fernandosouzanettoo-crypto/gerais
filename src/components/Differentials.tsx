"use client";

import { motion } from "framer-motion";
import { DIFFERENTIALS } from "@/lib/tempbox-data";

export default function Differentials() {
  return (
    <section className="relative bg-background py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {DIFFERENTIALS.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-6 text-center transition-colors hover:border-foreground/25"
            >
              <span className="text-2xl">{d.icon}</span>
              <span className="text-xs font-semibold leading-snug text-muted">{d.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
