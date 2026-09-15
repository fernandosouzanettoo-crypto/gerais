import { useRef } from "react";
import type { PointerEvent } from "react";

const MAX_TILT = 8;

export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  function onPointerMove(e: PointerEvent<T>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-y * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }

  return { ref, onPointerMove, onPointerLeave };
}
