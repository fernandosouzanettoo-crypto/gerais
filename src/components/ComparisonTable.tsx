"use client";

import { motion } from "framer-motion";
import { COMPARISON, MODELS, type FeatureLevel } from "@/lib/tempbox-data";

function Mark({ level }: { level: FeatureLevel }) {
  if (level === "no") return <span className="text-muted/50">—</span>;
  if (level === "double") return <span className="text-hot">✓✓</span>;
  return <span className="text-cold">✓</span>;
}

export default function ComparisonTable() {
  return (
    <section id="comparar" className="relative bg-background py-28">
      <div className="mx-auto max-w-4xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-3xl font-bold sm:text-5xl"
        >
          QUAL É A SUA?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14 overflow-x-auto rounded-2xl border border-line"
        >
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-surface">
                <th className="p-4 text-left font-normal text-muted">&nbsp;</th>
                {MODELS.map((m) => (
                  <th key={m.id} className="p-4 text-center font-display text-base font-bold">
                    {m.name.replace("TEMP BOX ", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-surface/40" : ""}>
                  <td className="p-4 text-muted">{row.label}</td>
                  <td className="p-4 text-center">
                    <Mark level={row.basic} />
                  </td>
                  <td className="p-4 text-center">
                    <Mark level={row.go} />
                  </td>
                  <td className="p-4 text-center">
                    <Mark level={row.pro} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="mt-6 text-center text-xs text-muted">
          Especificações finais em desenvolvimento — sujeitas a ajuste até o lançamento.
        </p>
      </div>
    </section>
  );
}
