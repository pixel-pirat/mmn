import { Router } from "express";
import { body, validationResult } from "express-validator";
import { pool } from "../db/pool";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/team — public
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM team_members ORDER BY category, display_order ASC"
    );
    res.json(rows);
  } catch (err) { next(err); }
});

// POST /api/team — admin only
router.post("/",
  requireAuth,
  body("name").notEmpty(),
  body("title").notEmpty(),
  body("category").isIn(["board", "executive"]),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { name, title, bio, expertise, email, linkedin, facebook, photo, category, display_order } = req.body;
      const { rows } = await pool.query(
        `INSERT INTO team_members (name, title, bio, expertise, email, linkedin, facebook, photo, category, display_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
        [name, title, bio ?? null, expertise ?? null, email ?? null, linkedin ?? null, facebook ?? null, photo ?? null, category, display_order ?? 0]
      );
      res.status(201).json(rows[0]);
    } catch (err) { next(err); }
  }
);

// PATCH /api/team/:id — admin only
router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    const fields = ["name", "title", "bio", "expertise", "email", "linkedin", "facebook", "photo", "category", "display_order"];
    const updates = fields.filter(f => req.body[f] !== undefined);
    if (!updates.length) return res.status(400).json({ error: "No fields to update." });
    const setClause = updates.map((f, i) => `${f} = $${i + 1}`).join(", ");
    const values = [...updates.map(f => req.body[f]), req.params.id];
    const { rows } = await pool.query(
      `UPDATE team_members SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (!rows.length) return res.status(404).json({ error: "Team member not found." });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

// DELETE /api/team/:id — admin only
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    await pool.query("DELETE FROM team_members WHERE id = $1", [req.params.id]);
    res.status(204).send();
  } catch (err) { next(err); }
});

export default router;
