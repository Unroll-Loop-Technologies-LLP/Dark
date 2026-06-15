import "dotenv/config";
import { handleContactRequest, setSecurityHeaders } from "../server/contact-handler.js";

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  return handleContactRequest(req, res);
}
