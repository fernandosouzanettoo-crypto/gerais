"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      const el = dotRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor-target]");
      setActive(Boolean(target));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-hot/70 mix-blend-difference transition-[width,height] duration-200 ease-out ${
        active ? "h-12 w-12" : "h-3 w-3"
      }`}
    />
  );
}
