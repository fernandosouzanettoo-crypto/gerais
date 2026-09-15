-- TEMP BOX — schema inicial do Supabase
-- Rode este arquivo no SQL editor do seu projeto Supabase.

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text,
  interested_model text,
  interested_color text,
  created_at timestamptz not null default now()
);

alter table waitlist enable row level security;

-- Permite que qualquer pessoa (via anon key) se inscreva na lista de espera.
create policy "public can insert waitlist" on waitlist
  for insert to anon
  with check (true);

-- Leitura fica restrita ao service role (usada pelo painel /admin e pela API).
create policy "service role can read waitlist" on waitlist
  for select to service_role
  using (true);

-- Estrutura futura, pensada para quando o catálogo for definido.
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  color text,
  sku text unique,
  created_at timestamptz not null default now()
);

create table if not exists colors (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  hex text
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  whatsapp text,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,
  product_variant_id uuid references product_variants(id) on delete set null,
  status text default 'pending',
  created_at timestamptz not null default now()
);
