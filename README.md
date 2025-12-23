# Luxe Interiors Website

A Next.js 16 (App Router) implementation of the cresta360 Interiors site with optimized imagery, email-ready contact form, and server-authoritative bot protection.

## 1. Prerequisites

- Node.js 18.17+ (or any version supported by Next.js 16)
- npm 9+
- A Gmail/SMTP account for outgoing mail

## 2. Install dependencies

```bash
npm install
```

## 3. Environment variables

Create `.env` at the project root:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=app-specific-password
EMAIL_TO=owner@gmail.com
```

> For other providers, replace host/port/user/pass accordingly.

### Generating a Gmail app password (step-by-step)
1. **Enable 2-Step Verification** on the Gmail account (Google Account → Security → "2-Step Verification").
2. After 2FA is on, open **Google Account → Security → App passwords**.
3. Choose **Mail** as the app and **Other (Custom name)** or a device type.
4. Click **Generate** to get a 16-character password.
5. Copy it immediately (Google will only show it once) and update `.env`:
   ```
   SMTP_USER=your@gmail.com
   SMTP_PASS=the_generated_app_password
   ```
6. Restart `npm run dev` (or the server process) so Next.js reloads env vars.

If Gmail blocks access, use a dedicated SMTP provider (SendGrid, Mailgun, SES) and fill in their credentials instead.

## 4. Development

```bash
npm run dev
```
- Local dev server: http://localhost:3000
- The contact form calls `/api/bot-challenge` to fetch a one-time token, then `/api/contact` to send the email.

## 5. Production build

```bash
npm run build
npm start
```
- `npm run build` outputs an optimized production bundle.
- `npm start` serves the built app.

## 6. Project highlights

- **Client ↔ Server form validation**: Full name, phone (+country + 12 digits), Gmail-only email.
- **Bot protection**: server-authoritative math/code challenge with short-lived tokens.
- **Image experience**: `next/image`, hover zoom overlay, responsive layout.
- **Email delivery**: Nodemailer + HTML template reflecting the site’s look & feel.

## 7. Troubleshooting

| Issue | Solution |
| --- | --- |
| `EAUTH` / `534-5.7.9 Application-specific password required` | Ensure 2FA + app password, then restart dev server. |
| Emails not delivered | Double-check `EMAIL_TO`, SMTP credentials, and provider logs. |
| Bot challenge failing or expired | Refresh the question (new token) before submitting. |
| Images 404 in dev | Confirm assets exist under `public/images/`. |

Feel free to extend the README with deployment steps (Vercel, Docker, etc.) as needed.
