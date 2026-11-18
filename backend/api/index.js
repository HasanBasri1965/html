import app from "../src/app.js";
import { connectDatabase } from "../src/config/database.js";

let isConnected = false;

async function ensureDb() {
  if (!isConnected) {
    await connectDatabase();
    isConnected = true;
  }
}

export default async function handler(req, res) {
  try {
    await ensureDb();
  } catch (err) {
    console.error("Vercel DB connection error:", err.message);
  }
  return app(req, res);
}
