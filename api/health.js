import "dotenv/config";
import { handleHealthRequest, setSecurityHeaders } from "../server/contact-handler.js";

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  return handleHealthRequest(req, res);
}
