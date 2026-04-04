import "dotenv/config";
import { handleHealthRequest } from "../../server/contact-handler.js";

function createResponseAdapter() {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: "",
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = JSON.stringify(payload);
      return this;
    },
    end(payload) {
      this.body = payload ?? "";
      return this;
    },
  };
}

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: {
        Allow: "GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method not allowed." }),
    };
  }

  const req = {
    method: event.httpMethod,
  };
  const res = createResponseAdapter();

  await handleHealthRequest(req, res);

  return {
    statusCode: res.statusCode,
    headers: res.headers,
    body: res.body,
  };
}
