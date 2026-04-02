import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";
import { requireAuth, requireSuperAdmin, AuthRequest } from "../middleware/auth";

const router = Router();

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body as { email: string; password: string };

    const { rows } = await pool.query(
      "SELECT * FROM admins WHERE email = $1",
      [email]
    );

    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET!,
      { expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as "7d" }
    );

    res.json({
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  }
);

// GET /api/auth/me
router.get("/me", requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  const { rows } = await pool.query(
    "SELECT id, name, email, role, created_at FROM admins WHERE id = $1",
    [req.adminId]
  );
  if (!rows[0]) { res.status(404).json({ error: "Admin not found." }); return; }
  res.json(rows[0]);
});

// POST /api/auth/change-password
router.post(
  "/change-password",
  requireAuth,
  [body("newPassword").isLength({ min: 8 })],
  async (req: AuthRequest, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const hash = await bcrypt.hash(req.body.newPassword as string, 12);
    await pool.query("UPDATE admins SET password = $1 WHERE id = $2", [hash, req.adminId]);
    res.json({ message: "Password updated." });
  }
);

// POST /api/auth/admins — superadmin only: create new admin
router.post(
  "/admins",
  requireAuth,
  requireSuperAdmin,
  [
    body("name").notEmpty().trim(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    body("role").isIn(["admin", "superadmin"]),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { res.status(400).json({ errors: errors.array() }); return; }

    const { name, email, password, role } = req.body as {
      name: string; email: string; password: string; role: string;
    };
    const hash = await bcrypt.hash(password, 12);

    const { rows } = await pool.query(
      "INSERT INTO admins (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role",
      [name, email, hash, role]
    );
    res.status(201).json(rows[0]);
  }
);

export default router;
