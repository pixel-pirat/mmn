import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  adminId?: number;
  adminRole?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided." });
    return;
  }

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      role: string;
    };
    req.adminId = payload.id;
    req.adminRole = payload.role;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token." });
  }
}

export function requireSuperAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  if (req.adminRole !== "superadmin") {
    res.status(403).json({ error: "Superadmin access required." });
    return;
  }
  next();
}
