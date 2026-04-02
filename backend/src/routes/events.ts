import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/events/register — public
router.post(
  "/register",
  [
    body("event_name").notEmpty().trim(),
    body("event_date").optional().trim(),
    body("name").notEmpty().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("phone").optional().trim(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400).json({ errors: errors.array() }); return; }

    const { event_name, event_date, name, email, phone } = req.body as {
      event_name: string; event_date?: string; name: string; email: string; phone?: string;
    };

    // Prevent duplicate registration for same event + email
    const existing = await pool.query(
      "SELECT id FROM event_registrations WHERE event_name = $1 AND email = $2",
      [event_name, email]
    );
    if (existing.rows.length > 0) {
      res.status(409).json({ message: "You're already registered for this event." });
      return;
    }

    const { rows } = await pool.query(
      `INSERT INTO event_registrations (event_name, event_date, name, email, phone)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, created_at`,
      [event_name, event_date ?? null, name, email, phone ?? null]
    );

    res.status(201).json({
      message: `Registered for "${event_name}"! Check your email for confirmation.`,
      id: rows[0].id,
    });
  }
);

// GET /api/events/registrations — admin: all registrations
router.get("/registrations", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const event = req.query.event as string | undefined;
  const query = event
    ? "SELECT * FROM event_registrations WHERE event_name = $1 ORDER BY created_at DESC"
    : "SELECT * FROM event_registrations ORDER BY created_at DESC";
  const { rows } = await pool.query(query, event ? [event] : []);
  res.json(rows);
});

// PATCH /api/events/registrations/:id — admin: update status
router.patch("/registrations/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { status } = req.body as { status: string };
  const { rows } = await pool.query(
    "UPDATE event_registrations SET status = $1 WHERE id = $2 RETURNING *",
    [status, req.params.id]
  );
  if (!rows[0]) { res.status(404).json({ error: "Not found." }); return; }
  res.json(rows[0]);
});

// DELETE /api/events/registrations/:id — admin
router.delete("/registrations/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  await pool.query("DELETE FROM event_registrations WHERE id = $1", [req.params.id]);
  res.json({ message: "Deleted." });
});

export default router;
