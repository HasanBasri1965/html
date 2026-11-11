import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// GET /health
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2311012812",
  });
});

export default app;
