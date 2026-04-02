import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/volunteers — public: submit application
router.post(
  "/",
  [
    body("name").notEmpty().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("phone").optional().trim(),
    body("motivation").optional().trim(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400).json({ errors: errors.array() }); return; }

    const { name, email, phone, motivation } = req.body as {
      name: string; email: string; phone?: string; motivation?: string;
    };

    const { rows } = await pool.query(
      `INSERT INTO volunteers (name, email, phone, motivation)
       VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
      [name, email, phone ?? null, motivation ?? null]
    );

    res.status(201).json({ message: "Application received. We'll be in touch soon!", id: rows[0].id });
  }
);

// GET /api/volunteers — admin: list all
router.get("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const status = req.query.status as string | undefined;
  const query = status
    ? "SELECT * FROM volunteers WHERE status = $1 ORDER BY created_at DESC"
    : "SELECT * FROM volunteers ORDER BY created_at DESC";
  const params = status ? [status] : [];
  const { rows } = await pool.query(query, params);
  res.json(rows);
});

// PATCH /api/volunteers/:id — admin: update status/notes
router.patch("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { status, notes } = req.body as { status?: string; notes?: string };
  const { rows } = await pool.query(
    `UPDATE volunteers SET
       status = COALESCE($1, status),
       notes  = COALESCE($2, notes)
     WHERE id = $3 RETURNING *`,
    [status ?? null, notes ?? null, req.params.id]
  );
  if (!rows[0]) { res.status(404).json({ error: "Not found." }); return; }
  res.json(rows[0]);
});

// DELETE /api/volunteers/:id — admin
router.delete("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  await pool.query("DELETE FROM volunteers WHERE id = $1", [req.params.id]);
  res.json({ message: "Deleted." });
});

export default router;
