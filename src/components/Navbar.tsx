"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#modelos", label: "Produtos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#comparar", label: "Comparar" },
  { href: "#galeria", label: "Galeria" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 ${
          scrolled
            ? "max-w-4xl rounded-full border border-line/80 bg-background/70 py-2 px-6 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          TEMP <span className="text-hot">BOX</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="underline-anim hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#lista-espera"
            className="hidden sm:inline-flex items-center rounded-full bg-hot px-4 py-2 text-xs font-semibold tracking-wide text-black transition-transform hover:scale-105 hover:bg-hot-glow"
          >
            ENTRE NA LISTA
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-foreground"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mx-4 mt-3 flex flex-col gap-1 rounded-2xl border border-line bg-surface/95 backdrop-blur-md p-4"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#lista-espera"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-hot px-4 py-3 text-center text-xs font-semibold text-black"
            >
              ENTRE NA LISTA
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
