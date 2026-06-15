import "dotenv/config";
import express from "express";
import { handleContactRequest, handleHealthRequest } from "./contact-handler.js";

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json({ limit: "100kb" }));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' https://www.google.com https://www.gstatic.com https://www.recaptcha.net; connect-src 'self' https://www.google.com https://www.recaptcha.net; img-src 'self' data: https://www.google.com https://www.gstatic.com https://www.recaptcha.net; style-src 'self' 'unsafe-inline' https://www.gstatic.com; font-src 'self' data:");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), gyroscope=(), magnetometer=(), accelerometer=()");
  next();
});

app.get("/api/health", handleHealthRequest);
app.post("/api/contact", handleContactRequest);

app.all("*", (_req, res) => {
  res.status(404).json({ error: "Not found." });
});

app.use((err, _req, res, _next) => {
  console.error("Express server error:", err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(port, () => {
  console.info(`Contact API listening on http://localhost:${port}`);
});
