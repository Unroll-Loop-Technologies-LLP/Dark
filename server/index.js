import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json({ limit: "100kb" }));

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
    throw new Error("Missing RECAPTCHA_SECRET_KEY");
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Failed to verify reCAPTCHA");
  }

  return response.json();
}

function createTransporter() {
  const user = process.env.SMTP_GMAIL_USER;
  const pass = process.env.SMTP_GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("Missing Gmail SMTP credentials");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const name = sanitizeValue(req.body?.name, 120);
    const email = sanitizeValue(req.body?.email, 160);
    const phone = sanitizeValue(req.body?.phone, 40);
    const company = sanitizeValue(req.body?.company, 120);
    const message = sanitizeValue(req.body?.message, 4000);
    const recaptchaToken = sanitizeValue(req.body?.recaptchaToken, 4000);
    const website = sanitizeValue(req.body?.website, 200);
    const inquiryType = sanitizeValue(req.body?.inquiryType, 20) || "message";
    const callDateTime = sanitizeValue(req.body?.callDateTime, 120);
    const timeZone = sanitizeValue(req.body?.timeZone, 120) || "UTC";

    if (website) {
      return res.status(400).json({ error: "Spam check failed." });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    if (!recaptchaToken) {
      return res.status(400).json({ error: "Missing reCAPTCHA token." });
    }

    let scheduledStart = null;
    let scheduledEnd = null;
    if (inquiryType === "call") {
      if (!callDateTime) {
        return res.status(400).json({ error: "Preferred call date and time is required." });
      }

      scheduledStart = new Date(callDateTime);
      if (Number.isNaN(scheduledStart.getTime())) {
        return res.status(400).json({ error: "Invalid call date and time." });
      }

      scheduledEnd = new Date(scheduledStart.getTime() + 30 * 60 * 1000);
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed." });
    }

    const transporter = createTransporter();
    const recipient = process.env.CONTACT_TO_EMAIL || process.env.SMTP_GMAIL_USER;
    const fromAddress = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_GMAIL_USER;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "-");
    const safeCompany = escapeHtml(company || "-");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
    const safeInquiryType = inquiryType === "call" ? "Schedule a Call" : "Contact Request";
    const safeTimeZone = escapeHtml(timeZone);
    const safeCallTime = scheduledStart
      ? escapeHtml(scheduledStart.toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "short",
          timeZone,
        }))
      : "-";

    const mailOptions = {
      from: `"Website Contact" <${fromAddress}>`,
      to: inquiryType === "call" ? [recipient, email].join(",") : recipient,
      replyTo: email,
      subject: inquiryType === "call"
        ? `Call request from ${name}`
        : `New website inquiry from ${name}`,
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
      ].filter(Boolean).join("\n"),
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

    res.json({ ok: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    res.status(500).json({ error: "Unable to send your message right now. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});
