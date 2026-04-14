/**
 * Adds cover_image column to the books table.
 * Usage: npm run db:add-cover-image
 * Safe to run multiple times (uses IF NOT EXISTS logic).
 */
import { pool } from "./pool";

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      ALTER TABLE books
      ADD COLUMN IF NOT EXISTS cover_image TEXT DEFAULT NULL;
    `);
    console.log("[migrate] ✓ cover_image column added to books table.");
  } catch (err) {
    console.error("[migrate] ✗ Failed:", (err as Error).message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
