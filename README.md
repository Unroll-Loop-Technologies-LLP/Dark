
  # Dark Homepage Design

  This is a code bundle for Dark Homepage Design. The original project is available at https://www.figma.com/design/tYRObJwvF3jvzkH7HOtChu/Dark-Homepage-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Copy `.env.example` to `.env` and fill in:
  - `VITE_RECAPTCHA_SITE_KEY`
  - `RECAPTCHA_SECRET_KEY`
  - `SMTP_GMAIL_USER`
  - `SMTP_GMAIL_APP_PASSWORD`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`

  For Gmail SMTP, use a Google App Password for the mailbox configured in `SMTP_GMAIL_USER`.

  Run `npm run dev` to start both:
  - the Vite frontend
  - the Express contact API on `http://localhost:3001`

  The contact form posts to `/api/contact`, verifies reCAPTCHA server-side, and sends email through Gmail SMTP.
  
