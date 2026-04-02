/**
 * Seeds the first superadmin account into Neon DB.
 * Usage: npm run db:seed
 * Change the password immediately after first login!
 */
import bcrypt from "bcryptjs";
import { pool } from "./pool";

async function seed() {
  const email = "admin@meaningmatters.org";
  const plainPassword = "ChangeMe123!";
  const hash = await bcrypt.hash(plainPassword, 12);

  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO admins (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING
       RETURNING email`,
      ["MMN Admin", email, hash, "superadmin"]
    );

    if (result.rowCount === 0) {
      console.log(`[seed] Admin already exists: ${email}`);
    } else {
      console.log(`[seed] ✓ Admin created: ${email}`);
      console.log(`[seed] ⚠  Default password: ${plainPassword} — change this immediately!`);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
