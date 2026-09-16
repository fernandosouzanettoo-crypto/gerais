"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const HOT_MIN = 40;
const HOT_MAX = 80;
const HOT_DEFAULT = 60;
const COLD_MIN = 2;
const COLD_MAX = 15;
const COLD_DEFAULT = 5;

type Status = "estavel" | "aquecendo" | "resfriando" | "ajustando";
type PowerState = "off" | "activating" | "on";

export default function ProControl() {
  const [hot, setHot] = useState(HOT_DEFAULT);
  const [cold, setCold] = useState(COLD_DEFAULT);
  const [power, setPower] = useState<PowerState>("off");
  const [hotStatus, setHotStatus] = useState<Status>("estavel");
  const [coldStatus, setColdStatus] = useState<Status>("estavel");
  const [focusSide, setFocusSide] = useState<"hot" | "cold" | null>(null);
  const [selectedSide, setSelectedSide] = useState<"hot" | "cold" | null>(null);
  const [autoRunning, setAutoRunning] = useState(false);

  const hotTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coldTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hotTimer.current) clearTimeout(hotTimer.current);
      if (coldTimer.current) clearTimeout(coldTimer.current);
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, []);

  const markHot = (dir: 1 | -1) => {
    setHotStatus(dir === 1 ? "aquecendo" : "ajustando");
    if (hotTimer.current) clearTimeout(hotTimer.current);
    hotTimer.current = setTimeout(() => setHotStatus("estavel"), 1100);
  };
  const markCold = (dir: 1 | -1) => {
    setColdStatus(dir === -1 ? "resfriando" : "ajustando");
    if (coldTimer.current) clearTimeout(coldTimer.current);
    coldTimer.current = setTimeout(() => setColdStatus("estavel"), 1100);
  };

  const changeHot = (next: number) => {
    const clamped = Math.min(HOT_MAX, Math.max(HOT_MIN, next));
    setHot((prev) => {
      if (clamped !== prev) markHot(clamped > prev ? 1 : -1);
      return clamped;
    });
  };
  const changeCold = (next: number) => {
    const clamped = Math.min(COLD_MAX, Math.max(COLD_MIN, next));
    setCold((prev) => {
      if (clamped !== prev) markCold(clamped < prev ? -1 : 1);
      return clamped;
    });
  };

  const activate = () => {
    if (power !== "off") return;
    setPower("activating");
    setTimeout(() => setPower("on"), 700);
  };

  const reset = () => {
    setHot(HOT_DEFAULT);
    setCold(COLD_DEFAULT);
    setHotStatus("estavel");
    setColdStatus("estavel");
    setPower("off");
    setAutoRunning(false);
    setSelectedSide(null);
    if (autoTimer.current) clearTimeout(autoTimer.current);
  };

  const runAuto = () => {
    if (autoRunning) return;
    if (power === "off") setPower("on");
    setAutoRunning(true);
    const hotTarget = 68;
    const coldTarget = 4;
    let step = 0;
    const tick = () => {
      step += 1;
      changeHot(Math.round(HOT_DEFAULT + (hotTarget - HOT_DEFAULT) * (step / 4)));
      changeCold(Math.round(COLD_DEFAULT + (coldTarget - COLD_DEFAULT) * (step / 4)));
      if (step < 4) {
        autoTimer.current = setTimeout(tick, 550);
      } else {
        setAutoRunning(false);
      }
    };
    autoTimer.current = setTimeout(tick, 550);
  };

  const isOn = power === "on";
  const hotIntensity = (hot - HOT_MIN) / (HOT_MAX - HOT_MIN);
  const coldIntensity = 1 - (cold - COLD_MIN) / (COLD_MAX - COLD_MIN);

  const statusLabel: Record<Status, string> = {
    estavel: "✓ ESTÁVEL",
    aquecendo: "🔥 AQUECENDO",
    resfriando: "❄️ RESFRIANDO",
    ajustando: "🌡️ AJUSTANDO",
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* product */}
        <motion.div
          animate={{
            scale: focusSide ? 1.04 : 1,
            x: focusSide === "hot" ? -8 : focusSide === "cold" ? 8 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mx-auto aspect-square w-full max-w-sm"
        >
          <motion.div
            aria-hidden
            animate={{ opacity: isOn ? 0.15 + hotIntensity * 0.45 : 0.05 }}
            className="pointer-events-none absolute -left-4 top-1/4 h-40 w-40 rounded-full bg-hot blur-[70px]"
          />
          <motion.div
            aria-hidden
            animate={{ opacity: isOn ? 0.15 + coldIntensity * 0.45 : 0.05 }}
            className="pointer-events-none absolute -right-4 top-1/4 h-40 w-40 rounded-full bg-cold blur-[70px]"
          />

          <Image
            src="/images/tempbox/angles/frontal.png"
            alt="TEMP BOX PRO"
            fill
            sizes="(max-width: 1024px) 85vw, 420px"
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
          />

          {/* clickable hot/cold halves */}
          <button
            aria-label="Selecionar lado quente"
            onClick={() => setSelectedSide(selectedSide === "hot" ? null : "hot")}
            className={`absolute left-0 top-0 h-full w-1/2 rounded-l-2xl transition-colors ${
              selectedSide === "hot" ? "bg-hot/10 ring-1 ring-inset ring-hot/40" : ""
            }`}
          />
          <button
            aria-label="Selecionar lado frio"
            onClick={() => setSelectedSide(selectedSide === "cold" ? null : "cold")}
            className={`absolute right-0 top-0 h-full w-1/2 rounded-r-2xl transition-colors ${
              selectedSide === "cold" ? "bg-cold/10 ring-1 ring-inset ring-cold/40" : ""
            }`}
          />

          {/* live readout overlay */}
          <AnimatePresence>
            {isOn && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-x-0 bottom-[30%] flex justify-center gap-6"
              >
                <span className="rounded-md bg-black/70 px-2.5 py-1 font-display text-lg font-bold text-hot backdrop-blur-sm">
                  {hot}°
                </span>
                <span className="rounded-md bg-black/70 px-2.5 py-1 font-display text-lg font-bold text-cold backdrop-blur-sm">
                  {cold}°
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* thermal micro-animation */}
          {isOn && hotIntensity > 0.15 && (
            <span className="animate-heat pointer-events-none absolute left-[28%] top-[38%] text-lg opacity-70">
              〰️
            </span>
          )}
          {isOn && coldIntensity > 0.15 && (
            <span className="animate-frost pointer-events-none absolute right-[28%] top-[38%] text-lg opacity-70">
              ❄
            </span>
          )}
        </motion.div>

        {/* controls */}
        <div className="rounded-3xl border border-line bg-surface-2/70 p-6 backdrop-blur-sm sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">TEMP BOX PRO</span>
            <span
              className={`text-xs font-semibold uppercase tracking-wide ${
                power === "on" ? "text-cold" : power === "activating" ? "text-hot" : "text-muted"
              }`}
            >
              {power === "on" ? "● ativa" : power === "activating" ? "ativando…" : "○ desligada"}
            </span>
          </div>

          <fieldset disabled={!isOn} className="space-y-6 disabled:opacity-40">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-hot">
                <span>🔥 QUENTE</span>
                <span className="font-display text-xl">{hot}°C</span>
              </div>
              <input
                type="range"
                min={HOT_MIN}
                max={HOT_MAX}
                value={hot}
                onPointerDown={() => setFocusSide("hot")}
                onPointerUp={() => setFocusSide(null)}
                onChange={(e) => changeHot(Number(e.target.value))}
                className="w-full accent-[var(--hot)]"
                aria-label="Temperatura do lado quente"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-muted">{hotStatus !== "estavel" || isOn ? statusLabel[hotStatus] : ""}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => changeHot(hot - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-hot/50 text-hot transition-transform hover:scale-110"
                  >
                    −
                  </button>
                  <button
                    onClick={() => changeHot(hot + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-hot/50 text-hot transition-transform hover:scale-110"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-cold">
                <span>❄️ FRIO</span>
                <span className="font-display text-xl">{cold}°C</span>
              </div>
              <input
                type="range"
                min={COLD_MIN}
                max={COLD_MAX}
                value={cold}
                onPointerDown={() => setFocusSide("cold")}
                onPointerUp={() => setFocusSide(null)}
                onChange={(e) => changeCold(Number(e.target.value))}
                className="w-full accent-[var(--cold)]"
                aria-label="Temperatura do lado frio"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-muted">{coldStatus !== "estavel" || isOn ? statusLabel[coldStatus] : ""}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => changeCold(cold - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-cold/50 text-cold transition-transform hover:scale-110"
                  >
                    −
                  </button>
                  <button
                    onClick={() => changeCold(cold + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-cold/50 text-cold transition-transform hover:scale-110"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {power === "off" ? (
              <button
                onClick={activate}
                className="flex-1 rounded-full bg-hot py-3 text-xs font-bold tracking-wide text-black transition-transform hover:scale-105"
              >
                ATIVAR TEMP BOX
              </button>
            ) : (
              <button
                onClick={runAuto}
                disabled={autoRunning}
                className="flex-1 rounded-full border border-line py-3 text-xs font-semibold tracking-wide text-foreground transition-transform hover:scale-105 disabled:opacity-50"
              >
                {autoRunning ? "AJUSTANDO…" : "MODO AUTOMÁTICO"}
              </button>
            )}
            <button
              onClick={reset}
              className="rounded-full border border-line px-5 py-3 text-xs font-semibold tracking-wide text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              RESETAR
            </button>
          </div>

          {selectedSide && (
            <p className="mt-4 text-center text-xs text-muted">
              {selectedSide === "hot" ? "Lado quente selecionado." : "Lado frio selecionado."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
