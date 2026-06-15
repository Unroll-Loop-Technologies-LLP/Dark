import nodemailer from "nodemailer";

function sanitizeValue(value, maxLength = 2000) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeIcsText(value) {
  return String(value || "")
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\r\n", "\\n")
    .replaceAll("\n", "\\n");
}

function formatUtcDate(date) {
  const iso = date.toISOString();
  return iso.replaceAll("-", "").replaceAll(":", "").replace(".000", "");
}

function buildCalendarInvite({ start, end, summary, description, organizerEmail, attendeeEmail }) {
  const now = formatUtcDate(new Date());

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//Unroll Loop//Contact Scheduler//EN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@unrollloop.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatUtcDate(start)}`,
    `DTEND:${formatUtcDate(end)}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `ORGANIZER;CN=Unroll Loop:${organizerEmail}`,
    `ATTENDEE;CN=Prospect;ROLE=REQ-PARTICIPANT;RSVP=TRUE:MAILTO:${attendeeEmail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    const error = new Error("Missing RECAPTCHA_SECRET_KEY");
    Object.assign(error, { status: 500 });
    throw error;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  let response;
  try {
    response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
  } catch (err) {
    const error = new Error("Failed to reach reCAPTCHA verification service.");
    Object.assign(error, { status: 502 });
    throw error;
  }

  if (!response.ok) {
    const error = new Error("Failed to verify reCAPTCHA");
    Object.assign(error, { status: 502 });
    throw error;
  }

  return response.json();
}

export function setSecurityHeaders(res) {
  const headers = {
    "Content-Security-Policy": "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; frame-src 'self' https://www.google.com https://www.recaptcha.net; script-src 'self' https://www.google.com https://www.gstatic.com https://www.recaptcha.net; connect-src 'self' https://www.google.com https://www.recaptcha.net; img-src 'self' data: https://www.google.com https://www.gstatic.com https://www.recaptcha.net; style-src 'self' 'unsafe-inline' https://www.gstatic.com; font-src 'self' data:",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), gyroscope=(), magnetometer=(), accelerometer=()",
  };

  if (typeof res.setHeader === "function") {
    for (const [name, value] of Object.entries(headers)) {
      res.setHeader(name, value);
    }
  }
}

function createTransporter() {
  const user = process.env.SMTP_GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.SMTP_GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  if (!user || !pass) {
    throw new Error("Missing Gmail SMTP credentials");
  }

  if (host) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

function sendJson(res, statusCode, payload) {
  if (typeof res.status === "function") {
    return res.status(statusCode).json(payload);
  }

  res.statusCode = statusCode;
  if (typeof res.setHeader === "function") {
    res.setHeader("Content-Type", "application/json");
  }
  res.end(JSON.stringify(payload));
}

function getBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return {};
}

export function handleHealthRequest(_req, res) {
  setSecurityHeaders(res);
  return sendJson(res, 200, { ok: true });
}

export async function handleContactRequest(req, res) {
  setSecurityHeaders(res);

  try {
    const body = getBody(req);
    const name = sanitizeValue(body?.name, 120);
    const email = sanitizeValue(body?.email, 160);
    const phone = sanitizeValue(body?.phone, 40);
    const company = sanitizeValue(body?.company, 120);
    const message = sanitizeValue(body?.message, 4000);
    const recaptchaToken = sanitizeValue(body?.recaptchaToken, 4000);
    const website = sanitizeValue(body?.website, 200);
    const inquiryType = sanitizeValue(body?.inquiryType, 20) || "message";
    const callDateTime = sanitizeValue(body?.callDateTime, 120);
    const timeZone = sanitizeValue(body?.timeZone, 120) || "UTC";

    if (website) {
      return sendJson(res, 400, { error: "Spam check failed." });
    }

    if (!name || !email || !message) {
      return sendJson(res, 400, { error: "Name, email, and message are required." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return sendJson(res, 400, { error: "Please enter a valid email address." });
    }

    if (!recaptchaToken) {
      return sendJson(res, 400, { error: "Missing reCAPTCHA token." });
    }

    let scheduledStart = null;
    let scheduledEnd = null;

    if (inquiryType === "call") {
      if (!callDateTime) {
        return sendJson(res, 400, { error: "Preferred call date and time is required." });
      }

      scheduledStart = new Date(callDateTime);
      if (Number.isNaN(scheduledStart.getTime())) {
        return sendJson(res, 400, { error: "Invalid call date and time." });
      }

      scheduledEnd = new Date(scheduledStart.getTime() + 30 * 60 * 1000);
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      return sendJson(res, 400, { error: "reCAPTCHA verification failed." });
    }

    const transporter = createTransporter();
    const smtpUser = process.env.SMTP_GMAIL_USER || process.env.SMTP_USER;
    const recipient = process.env.CONTACT_TO_EMAIL || process.env.CONTACT_EMAIL || smtpUser;
    const fromAddress = process.env.CONTACT_FROM_EMAIL || process.env.CONTACT_EMAIL || smtpUser;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "-");
    const safeCompany = escapeHtml(company || "-");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
    const safeInquiryType = inquiryType === "call" ? "Schedule a Call" : "Contact Request";
    const safeTimeZone = escapeHtml(timeZone);
    const safeCallTime = scheduledStart
      ? escapeHtml(
          scheduledStart.toLocaleString("en-US", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone,
          }),
        )
      : "-";

    const mailOptions = {
      from: `"Website Contact" <${fromAddress}>`,
      to: inquiryType === "call" ? [recipient, email].join(",") : recipient,
      replyTo: email,
      subject: inquiryType === "call" ? `Call request from ${name}` : `New website inquiry from ${name}`,
      text: [
        `Type: ${safeInquiryType}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        `Company: ${company || "-"}`,
        inquiryType === "call" ? `Preferred time: ${safeCallTime} (${timeZone})` : null,
        "",
        inquiryType === "call" ? "Call agenda:" : "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">${safeInquiryType}</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
          ${inquiryType === "call" ? `<p><strong>Preferred time:</strong> ${safeCallTime} (${safeTimeZone})</p>` : ""}
          <p><strong>${inquiryType === "call" ? "Call agenda" : "Message"}:</strong></p>
          <div style="padding: 16px; border-radius: 12px; background: #f3f4f6;">${safeMessage}</div>
        </div>
      `,
    };

    if (inquiryType === "call" && scheduledStart && scheduledEnd) {
      const calendarInvite = buildCalendarInvite({
        start: scheduledStart,
        end: scheduledEnd,
        summary: `Discovery Call with ${name}`,
        description: `Discovery call requested from the website.\n\nAgenda:\n${message}`,
        organizerEmail: `MAILTO:${fromAddress}`,
        attendeeEmail: email,
      });

      mailOptions.attachments = [
        {
          filename: "discovery-call.ics",
          content: calendarInvite,
          contentType: "text/calendar; charset=utf-8; method=REQUEST",
        },
      ];
    }

    await transporter.sendMail(mailOptions);
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    const status = typeof error?.status === "number" ? error.status : 500;
    console.error("Contact form submission failed:", error);
    return sendJson(res, status, { error: "Unable to send your message right now. Please try again later." });
  }
}
