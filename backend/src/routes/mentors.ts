import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/mentors — public
router.post(
  "/",
  [
    body("name").notEmpty().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("expertise").optional().trim(),
    body("experience").optional().trim(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400).json({ errors: errors.array() }); return; }

    const { name, email, expertise, experience } = req.body as {
      name: string; email: string; expertise?: string; experience?: string;
    };

    const { rows } = await pool.query(
      `INSERT INTO mentors (name, email, expertise, experience)
       VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
      [name, email, expertise ?? null, experience ?? null]
    );

    res.status(201).json({ message: "Mentor application received! We'll review and reach out.", id: rows[0].id });
  }
);

// GET /api/mentors — admin
router.get("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const status = req.query.status as string | undefined;
  const query = status
    ? "SELECT * FROM mentors WHERE status = $1 ORDER BY created_at DESC"
    : "SELECT * FROM mentors ORDER BY created_at DESC";
  const { rows } = await pool.query(query, status ? [status] : []);
  res.json(rows);
});

// PATCH /api/mentors/:id — admin
router.patch("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { status, notes } = req.body as { status?: string; notes?: string };
  const { rows } = await pool.query(
    `UPDATE mentors SET
       status = COALESCE($1, status),
       notes  = COALESCE($2, notes)
     WHERE id = $3 RETURNING *`,
    [status ?? null, notes ?? null, req.params.id]
  );
  if (!rows[0]) { res.status(404).json({ error: "Not found." }); return; }
  res.json(rows[0]);
});

// DELETE /api/mentors/:id — admin
router.delete("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  await pool.query("DELETE FROM mentors WHERE id = $1", [req.params.id]);
  res.json({ message: "Deleted." });
});

export default router;
