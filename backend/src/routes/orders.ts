import { Router } from "express";
import { body, validationResult } from "express-validator";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/orders — public (place order)
router.post("/",
  body("customer_name").notEmpty(),
  body("customer_email").isEmail(),
  body("items").isArray({ min: 1 }),
  body("total").isNumeric(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { customer_name, customer_email, customer_phone, items, total } = req.body;
      const { rows } = await pool.query(
        `INSERT INTO orders (customer_name, customer_email, customer_phone, items, total)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [customer_name, customer_email, customer_phone ?? null, JSON.stringify(items), total]
      );
      res.status(201).json({ message: "Order placed successfully.", order: rows[0] });
    } catch (err) { next(err); }
  }
);

// GET /api/orders — admin only
router.get("/", requireAuth, async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) { next(err); }
});

// PATCH /api/orders/:id — admin only (update status)
router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const { rows } = await pool.query(
      `UPDATE orders SET status = COALESCE($1, status), notes = COALESCE($2, notes) WHERE id = $3 RETURNING *`,
      [status ?? null, notes ?? null, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Order not found." });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

export default router;
