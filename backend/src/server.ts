import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes       from "./routes/auth";
import volunteerRoutes  from "./routes/volunteers";
import mentorRoutes     from "./routes/mentors";
import partnerRoutes    from "./routes/partners";
import contactRoutes    from "./routes/contact";
import newsletterRoutes from "./routes/newsletter";
import eventRoutes      from "./routes/events";
import dashboardRoutes  from "./routes/dashboard";
import bookRoutes       from "./routes/books";
import orderRoutes      from "./routes/orders";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

// ── Security & logging ───────────────────────────────────────
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ── CORS ─────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ── Body parsing ─────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));

// ── Health check ─────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Routes ───────────────────────────────────────────────────
app.use("/api/auth",       authRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/mentors",    mentorRoutes);
app.use("/api/partners",   partnerRoutes);
app.use("/api/contact",    contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/events",     eventRoutes);
app.use("/api/dashboard",  dashboardRoutes);
app.use("/api/books",      bookRoutes);
app.use("/api/orders",     orderRoutes);

// ── 404 ──────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ── Error handler ────────────────────────────────────────────
app.use(errorHandler);

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[MMN API] Running on http://localhost:${PORT}`);
  console.log(`[MMN API] Environment: ${process.env.NODE_ENV ?? "development"}`);
});

export default app;
