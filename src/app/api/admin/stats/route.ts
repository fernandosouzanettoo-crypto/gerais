import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const COOKIE_NAME = "tempbox_admin";

async function isAuthorized() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME)?.value;
  if (!cookie) return false;
  return cookie === createHash("sha256").update(adminPassword).digest("hex");
}

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY para ver dados reais." },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("waitlist")
    .select("created_at, interested_model, interested_color")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = data ?? [];
  const byDay: Record<string, number> = {};
  const byModel: Record<string, number> = {};
  const byColor: Record<string, number> = {};

  for (const row of rows) {
    const day = new Date(row.created_at as string).toISOString().slice(0, 10);
    byDay[day] = (byDay[day] ?? 0) + 1;
    if (row.interested_model) byModel[row.interested_model] = (byModel[row.interested_model] ?? 0) + 1;
    if (row.interested_color) byColor[row.interested_color] = (byColor[row.interested_color] ?? 0) + 1;
  }

  const sevenDaysAgo = Date.now() - 7 * 86_400_000;
  const last7Days = rows.filter((r) => new Date(r.created_at as string).getTime() >= sevenDaysAgo).length;

  return NextResponse.json({
    total: rows.length,
    last7Days,
    byDay,
    byModel,
    byColor,
  });
}
