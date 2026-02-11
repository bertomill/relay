import express from "express";
import cors from "cors";
import { handleRay } from "./agents/ray";
import { handleScout } from "./agents/scout";
import { handleContentCreator } from "./agents/content-creator";
import { handleSdkTutor } from "./agents/sdk-tutor";
import { handleOutreach } from "./agents/outreach";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS — allow Vercel production + localhost dev
const allowedOrigins = [
  "http://localhost:3000",
  "https://lighten.ai",
  "https://www.lighten.ai",
  "https://lighten-bertomill.vercel.app",
];

// Also allow any *.vercel.app preview deploys
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Agent routes
const agentHandlers: Record<string, express.RequestHandler> = {
  ray: handleRay,
  scout: handleScout,
  "content-creator": handleContentCreator,
  "sdk-tutor": handleSdkTutor,
  outreach: handleOutreach,
};

app.post("/agents/:name", (req, res, next) => {
  const handler = agentHandlers[req.params.name];
  if (!handler) {
    res.status(404).json({ error: `Agent "${req.params.name}" not found` });
    return;
  }
  handler(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Agent server listening on port ${PORT}`);
});
