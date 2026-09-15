"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "./Countdown";

type Status = "idle" | "loading" | "success" | "error";

export default function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Não foi possível concluir sua inscrição.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Falha de conexão. Tente novamente.");
      setStatus("error");
    }
  };

  return (
    <section id="lista-espera" className="relative bg-surface py-28">
      <div className="mx-auto max-w-xl px-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="font-display text-3xl font-bold sm:text-5xl"
        >
          TEMP BOX ESTÁ CHEGANDO.
        </motion.h2>
        <p className="mt-4 text-sm text-muted sm:text-base">
          Seja um dos primeiros a conhecer o lançamento.
        </p>

        <div className="mt-10">
          <Countdown />
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-cold/40 bg-background p-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cold/20 text-2xl text-cold"
                >
                  ✓
                </motion.div>
                <p className="mt-5 font-display text-xl font-bold">Você está dentro.</p>
                <p className="mt-2 text-sm text-muted">
                  Vamos avisar quando a TEMP BOX estiver pronta.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={onSubmit}
                className="space-y-3 text-left"
              >
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome"
                  className="w-full rounded-xl border border-line bg-background px-5 py-4 text-sm outline-none transition-colors focus:border-hot"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full rounded-xl border border-line bg-background px-5 py-4 text-sm outline-none transition-colors focus:border-hot"
                />
                <input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="WhatsApp"
                  className="w-full rounded-xl border border-line bg-background px-5 py-4 text-sm outline-none transition-colors focus:border-hot"
                />
                {status === "error" && (
                  <p className="text-sm text-hot">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-hot py-4 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-hot-glow disabled:opacity-60"
                >
                  {status === "loading" ? "ENVIANDO..." : "QUERO SER AVISADO"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
