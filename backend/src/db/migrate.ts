/**
 * Run migrations against Neon DB.
 * Usage: npm run db:migrate
 */
import fs from "fs";
import path from "path";
import { pool } from "./pool";

async function migrate() {
  const schemaPath = path.join(__dirname, "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf-8");

  console.log("[migrate] Connecting to Neon DB…");
  const client = await pool.connect();

  try {
    console.log("[migrate] Running schema.sql…");
    await client.query(sql);
    console.log("[migrate] ✓ Schema applied successfully.");
  } catch (err) {
    console.error("[migrate] ✗ Migration failed:", (err as Error).message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
