import { Router } from "express";
import { body, validationResult } from "express-validator";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/books — public
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM books ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) { next(err); }
});

// POST /api/books — admin only
router.post("/",
  requireAuth,
  body("title").notEmpty(),
  body("author").notEmpty(),
  body("price").isNumeric(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { title, author, price, category, description, cover_color, cover_image, in_stock } = req.body;
      const { rows } = await pool.query(
        `INSERT INTO books (title, author, price, category, description, cover_color, cover_image, in_stock)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [title, author, price, category ?? null, description ?? null, cover_color ?? "from-emerald-500 to-teal-600", cover_image ?? null, in_stock ?? true]
      );
      res.status(201).json(rows[0]);
    } catch (err) { next(err); }
  }
);

// PATCH /api/books/:id — admin only
router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    const fields = ["title", "author", "price", "category", "description", "cover_color", "cover_image", "in_stock"];
    const updates = fields.filter(f => req.body[f] !== undefined);
    if (!updates.length) return res.status(400).json({ error: "No fields to update." });
    const setClause = updates.map((f, i) => `${f} = $${i + 1}`).join(", ");
    const values = [...updates.map(f => req.body[f]), req.params.id];
    const { rows } = await pool.query(
      `UPDATE books SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (!rows.length) return res.status(404).json({ error: "Book not found." });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

// DELETE /api/books/:id — admin only
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    await pool.query("DELETE FROM books WHERE id = $1", [req.params.id]);
    res.status(204).send();
  } catch (err) { next(err); }
});

export default router;
