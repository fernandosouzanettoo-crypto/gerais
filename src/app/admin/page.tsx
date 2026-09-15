"use client";

import { useState } from "react";

interface Stats {
  total: number;
  last7Days: number;
  byDay: Record<string, number>;
  byModel: Record<string, number>;
  byColor: Record<string, number>;
}

function Bars({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...entries.map(([, v]) => v));
  if (entries.length === 0) return <p className="text-sm text-muted">Sem dados ainda.</p>;
  return (
    <div className="space-y-2">
      {entries.map(([label, value]) => (
        <div key={label} className="flex items-center gap-3 text-sm">
          <span className="w-32 shrink-0 truncate text-muted">{label}</span>
          <div className="h-2 flex-1 rounded-full bg-surface-2">
            <div
              className="h-2 rounded-full bg-hot"
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="w-8 text-right tabular-nums">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Falha ao entrar.");
      setLoading(false);
      return;
    }
    setAuthed(true);
    const statsRes = await fetch("/api/admin/stats");
    const statsData = await statsRes.json();
    if (statsRes.ok) setStats(statsData);
    else setError(statsData.error ?? "Falha ao carregar dados.");
    setLoading(false);
  };

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <form onSubmit={login} className="w-full max-w-sm space-y-4">
          <h1 className="font-display text-xl font-bold">Admin — TEMP BOX</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-hot"
          />
          {error && <p className="text-sm text-hot">{error}</p>}
          <button
            disabled={loading}
            className="w-full rounded-full bg-hot py-3 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-2xl font-bold">Painel — Lista de espera</h1>

        {error && <p className="mt-4 text-sm text-hot">{error}</p>}

        {stats && (
          <div className="mt-10 space-y-10">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-xs text-muted">Total de inscritos</p>
                <p className="mt-2 font-display text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="text-xs text-muted">Últimos 7 dias</p>
                <p className="mt-2 font-display text-3xl font-bold">{stats.last7Days}</p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                Inscritos por dia
              </h2>
              <Bars data={stats.byDay} />
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                Interesse por modelo
              </h2>
              <Bars data={stats.byModel} />
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                Interesse por cor
              </h2>
              <Bars data={stats.byColor} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
