
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

  ## Deploying

  Vercel:
  - The repo includes `api/contact.js` and `api/health.js` for Vercel Functions.

  Netlify:
  - The repo includes `netlify/functions/contact.js` and `netlify/functions/health.js`.
  - `netlify.toml` routes `/api/contact` and `/api/health` to those functions.
  - Set the same environment variables in Netlify site settings before deploying.
  
