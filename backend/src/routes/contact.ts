import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/contact — public
router.post(
  "/",
  [
    body("name").notEmpty().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("subject").optional().trim(),
    body("message").notEmpty().trim(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400).json({ errors: errors.array() }); return; }

    const { name, email, subject, message } = req.body as {
      name: string; email: string; subject?: string; message: string;
    };

    const { rows } = await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
      [name, email, subject ?? null, message]
    );

    res.status(201).json({ message: "Message sent! We'll get back to you within 24 hours.", id: rows[0].id });
  }
);

// GET /api/contact — admin
router.get("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const status = req.query.status as string | undefined;
  const query = status
    ? "SELECT * FROM contact_messages WHERE status = $1 ORDER BY created_at DESC"
    : "SELECT * FROM contact_messages ORDER BY created_at DESC";
  const { rows } = await pool.query(query, status ? [status] : []);
  res.json(rows);
});

// PATCH /api/contact/:id — admin: mark read/replied, add notes
router.patch("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { status, notes } = req.body as { status?: string; notes?: string };
  const { rows } = await pool.query(
    `UPDATE contact_messages SET
       status = COALESCE($1, status),
       notes  = COALESCE($2, notes)
     WHERE id = $3 RETURNING *`,
    [status ?? null, notes ?? null, req.params.id]
  );
  if (!rows[0]) { res.status(404).json({ error: "Not found." }); return; }
  res.json(rows[0]);
});

// DELETE /api/contact/:id — admin
router.delete("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  await pool.query("DELETE FROM contact_messages WHERE id = $1", [req.params.id]);
  res.json({ message: "Deleted." });
});

export default router;
