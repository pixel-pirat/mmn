/**
 * Creates the team_members table for managing executives and board.
 * Usage: npm run db:add-team-table
 * Safe to run multiple times.
 */
import { pool } from "./pool";

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        title VARCHAR(120) NOT NULL,
        bio TEXT,
        expertise VARCHAR(120),
        email VARCHAR(255),
        linkedin VARCHAR(255),
        facebook VARCHAR(255),
        photo TEXT,
        category VARCHAR(30) NOT NULL DEFAULT 'executive',
        display_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_team_category ON team_members(category);
      CREATE INDEX IF NOT EXISTS idx_team_order ON team_members(display_order);
    `);
    console.log("[migrate] ✓ team_members table created.");
  } catch (err) {
    console.error("[migrate] ✗ Failed:", (err as Error).message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
