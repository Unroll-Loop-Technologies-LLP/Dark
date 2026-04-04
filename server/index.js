import "dotenv/config";
import express from "express";
import { handleContactRequest, handleHealthRequest } from "./contact-handler.js";

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json({ limit: "100kb" }));

app.get("/api/health", handleHealthRequest);
app.post("/api/contact", handleContactRequest);

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});
