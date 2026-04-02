import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/partners — public
router.post(
  "/",
  [
    body("org_name").notEmpty().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("contact_name").optional().trim(),
    body("details").optional().trim(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400).json({ errors: errors.array() }); return; }

    const { org_name, contact_name, email, details } = req.body as {
      org_name: string; contact_name?: string; email: string; details?: string;
    };

    const { rows } = await pool.query(
      `INSERT INTO partners (org_name, contact_name, email, details)
       VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
      [org_name, contact_name ?? null, email, details ?? null]
    );

    res.status(201).json({ message: "Partnership inquiry sent! Our team will be in touch.", id: rows[0].id });
  }
);

// GET /api/partners — admin
router.get("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { rows } = await pool.query("SELECT * FROM partners ORDER BY created_at DESC");
  res.json(rows);
});

// PATCH /api/partners/:id — admin
router.patch("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { status, notes } = req.body as { status?: string; notes?: string };
  const { rows } = await pool.query(
    `UPDATE partners SET
       status = COALESCE($1, status),
       notes  = COALESCE($2, notes)
     WHERE id = $3 RETURNING *`,
    [status ?? null, notes ?? null, req.params.id]
  );
  if (!rows[0]) { res.status(404).json({ error: "Not found." }); return; }
  res.json(rows[0]);
});

// DELETE /api/partners/:id — admin
router.delete("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  await pool.query("DELETE FROM partners WHERE id = $1", [req.params.id]);
  res.json({ message: "Deleted." });
});

export default router;
