-- Esquema de la base de datos de prospectos (PostgreSQL)
-- Aplicar en la instancia de PostgreSQL configurada mediante DATABASE_URL.
-- El endpoint de la API ejecuta CREATE TABLE IF NOT EXISTS al arrancar,
-- por lo que este archivo es la referencia canónica del esquema.

CREATE TABLE IF NOT EXISTS prospecto (
  id          BIGSERIAL PRIMARY KEY,
  tipo        TEXT NOT NULL CHECK (tipo IN ('diagnostico', 'contacto')),
  nombre      TEXT NOT NULL,
  email       TEXT,
  telefono    TEXT,
  mensaje     TEXT,
  estado      TEXT NOT NULL DEFAULT 'nuevo',
  ip          TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prospecto_estado ON prospecto (estado);
CREATE INDEX IF NOT EXISTS idx_prospecto_created_at ON prospecto (created_at DESC);
