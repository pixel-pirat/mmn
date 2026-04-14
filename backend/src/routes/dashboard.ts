import { Router, Response } from "express";
import { pool } from "../db/pool";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/dashboard/stats — admin: summary counts for the admin panel
router.get("/stats", requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  const [volunteers, mentors, partners, messages, subscribers, registrations, books, orders, pendingOrders] =
    await Promise.all([
      pool.query("SELECT COUNT(*) FROM volunteers"),
      pool.query("SELECT COUNT(*) FROM mentors"),
      pool.query("SELECT COUNT(*) FROM partners"),
      pool.query("SELECT COUNT(*) FROM contact_messages WHERE status = 'unread'"),
      pool.query("SELECT COUNT(*) FROM newsletter_subscribers WHERE status = 'active'"),
      pool.query("SELECT COUNT(*) FROM event_registrations"),
      pool.query("SELECT COUNT(*) FROM books"),
      pool.query("SELECT COUNT(*) FROM orders"),
      pool.query("SELECT COUNT(*) FROM orders WHERE status = 'pending'"),
    ]);

  res.json({
    volunteers:    Number(volunteers.rows[0].count),
    mentors:       Number(mentors.rows[0].count),
    partners:      Number(partners.rows[0].count),
    unread_messages: Number(messages.rows[0].count),
    subscribers:   Number(subscribers.rows[0].count),
    event_registrations: Number(registrations.rows[0].count),
    books:         Number(books.rows[0].count),
    orders:        Number(orders.rows[0].count),
    pending_orders: Number(pendingOrders.rows[0].count),
  });
});

// GET /api/dashboard/recent — admin: last 5 of each type
router.get("/recent", requireAuth, async (_req: AuthRequest, res: Response): Promise<void> => {
  const [volunteers, messages, registrations] = await Promise.all([
    pool.query("SELECT id, name, email, status, created_at FROM volunteers ORDER BY created_at DESC LIMIT 5"),
    pool.query("SELECT id, name, email, subject, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5"),
    pool.query("SELECT id, name, email, event_name, created_at FROM event_registrations ORDER BY created_at DESC LIMIT 5"),
  ]);

  res.json({
    volunteers: volunteers.rows,
    messages:   messages.rows,
    registrations: registrations.rows,
  });
});

export default router;
