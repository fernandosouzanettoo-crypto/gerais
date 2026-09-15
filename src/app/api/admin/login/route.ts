import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "tempbox_admin";

function tokenFor(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD não configurado neste ambiente." },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const supplied = body.password ?? "";
  const expected = tokenFor(adminPassword);
  const suppliedHash = tokenFor(supplied);

  const match =
    suppliedHash.length === expected.length &&
    timingSafeEqual(Buffer.from(suppliedHash), Buffer.from(expected));

  if (!match) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
