import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import dotenv from "dotenv";

dotenv.config();

// Required for Neon serverless driver in Node.js environments
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and add your Neon connection string.");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon free tier: keep pool small
  max: 5,
});

pool.on("error", (err: Error) => {
  console.error("[DB] Unexpected pool error:", err.message);
});
