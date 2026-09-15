import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: Request) {
  let body: { name?: string; email?: string; whatsapp?: string; model?: string; color?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const whatsapp = (body.whatsapp ?? "").trim();

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Preencha nome e um e-mail válido." }, { status: 400 });
  }

  const supabase = getServerSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Supabase não configurado neste ambiente. Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (ou NEXT_PUBLIC_SUPABASE_ANON_KEY) para salvar inscrições.",
      },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("waitlist").insert({
    name,
    email,
    whatsapp: whatsapp || null,
    interested_model: body.model ?? null,
    interested_color: body.color ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
