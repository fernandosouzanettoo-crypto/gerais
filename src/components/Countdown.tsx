"use client";

import { useEffect, useState } from "react";

const LAUNCH_DATE = process.env.NEXT_PUBLIC_LAUNCH_DATE;

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const target = LAUNCH_DATE ? new Date(LAUNCH_DATE).getTime() : null;
  const [remaining, setRemaining] = useState(() => (target ? getRemaining(target) : null));

  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target || !remaining) {
    return (
      <p className="font-display text-2xl font-bold tracking-wide text-muted sm:text-3xl">
        LANÇAMENTO EM BREVE
      </p>
    );
  }

  const units: [string, number][] = [
    ["Dias", remaining.days],
    ["Horas", remaining.hours],
    ["Minutos", remaining.minutes],
    ["Segundos", remaining.seconds],
  ];

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      {units.map(([label, value]) => (
        <div key={label} className="text-center">
          <p className="font-display text-3xl font-bold tabular-nums sm:text-5xl">
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
