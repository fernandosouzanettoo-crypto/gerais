# TEMP BOX — Site

Site de pré-lançamento da TEMP BOX (Next.js + TypeScript + Tailwind CSS v4 + Framer Motion).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Configuração (opcional)

Copie `.env.example` para `.env.local` e preencha:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`:
  necessários para a lista de espera gravar no Supabase e para o painel `/admin` ler os dados.
  Rode `supabase/schema.sql` no SQL editor do seu projeto Supabase antes de usar.
- `ADMIN_PASSWORD`: senha do painel administrativo em `/admin`.
- `NEXT_PUBLIC_LAUNCH_DATE`: data de lançamento em ISO 8601 (ex: `2026-03-01T00:00:00-03:00`).
  Se vazio, o contador mostra "LANÇAMENTO EM BREVE".

Sem essas variáveis, o site funciona normalmente — apenas o envio da lista de espera e o
`/admin` ficam indisponíveis.

## Imagens

As imagens em `public/images/tempbox` são placeholders/renders de referência (ver
`public/images/tempbox/README` original em `supabase/` para o texto completo). Substitua por
renders/fotos finais aprovados antes do lançamento.

## Estrutura

- `src/app/page.tsx`: monta todas as seções da landing page, na ordem.
- `src/components/`: um componente por seção (ver lista no próprio diretório).
- `src/lib/tempbox-data.ts`: conteúdo (modelos, cores, comparativo, FAQ) — edite aqui para
  atualizar textos sem mexer nos componentes.
- `src/app/api/waitlist`: recebe as inscrições da lista de espera.
- `src/app/admin`: painel protegido por senha com estatísticas da lista de espera.
