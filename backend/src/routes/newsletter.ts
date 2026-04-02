import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/newsletter/subscribe — public
router.post(
  "/subscribe",
  [body("email").isEmail().normalizeEmail()],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400).json({ errors: errors.array() }); return; }

    const { email } = req.body as { email: string };

    // Upsert: re-subscribe if previously unsubscribed
    await pool.query(
      `INSERT INTO newsletter_subscribers (email, status)
       VALUES ($1, 'active')
       ON CONFLICT (email) DO UPDATE SET status = 'active'`,
      [email]
    );

    res.status(201).json({ message: "You're subscribed! Welcome to the MMN community." });
  }
);

// POST /api/newsletter/unsubscribe — public (via email link)
router.post(
  "/unsubscribe",
  [body("email").isEmail().normalizeEmail()],
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body as { email: string };
    await pool.query(
      "UPDATE newsletter_subscribers SET status = 'unsubscribed' WHERE email = $1",
      [email]
    );
    res.json({ message: "You've been unsubscribed." });
  }
);

// GET /api/newsletter — admin: list active subscribers
router.get("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const status = (req.query.status as string) ?? "active";
  const { rows } = await pool.query(
    "SELECT * FROM newsletter_subscribers WHERE status = $1 ORDER BY subscribed_at DESC",
    [status]
  );
  res.json(rows);
});

// DELETE /api/newsletter/:id — admin
router.delete("/:id", requireAuth, async (req: Request, res: Response): Promise<void> => {
  await pool.query("DELETE FROM newsletter_subscribers WHERE id = $1", [req.params.id]);
  res.json({ message: "Deleted." });
});

export default router;
