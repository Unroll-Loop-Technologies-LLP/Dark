import "dotenv/config";
import { handleHealthRequest } from "../server/contact-handler.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  return handleHealthRequest(req, res);
}
