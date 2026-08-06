import pg from "pg";

export interface Prospect {
  tipo: "diagnostico" | "contacto";
  nombre: string;
  email: string | null;
  telefono: string | null;
  mensaje: string | null;
  ip: string | null;
}

let pool: pg.Pool | null = null;

function getPool(): pg.Pool {
  if (!pool) {
    pool = new pg.Pool({
      connectionString: import.meta.env.DATABASE_URL,
    });
  }
  return pool;
}

/** Crea la tabla si no existe (migración idempotente para el MVP). */
export async function ensureSchema(): Promise<void> {
  if (!import.meta.env.DATABASE_URL) {
    console.warn(
      "[prospecto] DATABASE_URL no configurada: la persistencia estará deshabilitada."
    );
    return;
  }
  const client = await getPool().connect();
  try {
    await client.query(`
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
    `);
  } finally {
    client.release();
  }
}

/** Persiste un prospecto. Lanza error si la base no está disponible. */
export async function insertProspect(prospect: Prospect): Promise<number> {
  if (!import.meta.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no configurada");
  }
  await ensureSchema();
  const result = await getPool().query(
    `INSERT INTO prospecto (tipo, nombre, email, telefono, mensaje, ip)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [
      prospect.tipo,
      prospect.nombre,
      prospect.email,
      prospect.telefono,
      prospect.mensaje,
      prospect.ip,
    ]
  );
  return result.rows[0].id as number;
}
