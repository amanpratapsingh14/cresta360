import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { buildContactEmail } from "../../../lib/email-template";
import { validateChallenge } from "../../../lib/bot-challenge-service";

const REQUIRED_FIELDS = ["name", "phone", "city", "service", "message", "email"];
const MIN_FORM_TIME_MS = 3000;
const NAME_REGEX = /^[A-Za-z\s]+$/;
const PHONE_REGEX = /^\+\d{12}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request) {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { error: "Email service is not configured. Please set SMTP environment variables." },
        { status: 500 },
      );
    }

    const payload = await request.json();

    // Honeypot and basic bot checks
    if (payload.preferredTime) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    if (!payload.challengeToken || !payload.challengeAnswer) {
      return NextResponse.json({ error: "Missing bot challenge response." }, { status: 400 });
    }

    const challengeValid = validateChallenge(payload.challengeToken, payload.challengeAnswer);
    if (!challengeValid) {
      return NextResponse.json({ error: "Bot verification failed." }, { status: 400 });
    }

    if (Number(payload.formDuration || 0) < MIN_FORM_TIME_MS) {
      return NextResponse.json({ error: "Form submitted too quickly." }, { status: 400 });
    }

    for (const field of REQUIRED_FIELDS) {
      if (!payload[field] || !String(payload[field]).trim()) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (!NAME_REGEX.test(payload.name.trim())) {
      return NextResponse.json({ error: "Name must contain only letters and spaces." }, { status: 400 });
    }

    if (!PHONE_REGEX.test(payload.phone.trim())) {
      return NextResponse.json(
        { error: "Phone must start with + and include 12 digits (e.g., +911234567890)." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(payload.email.trim())) {
      return NextResponse.json({ error: "Email must be a valid Gmail address." }, { status: 400 });
    }

    const html = buildContactEmail(payload);

    const ownerEmail = process.env.EMAIL_TO || process.env.SMTP_USER;
    const senderEmail = `${payload.name} <${payload.email}>`;

    await transporter.sendMail({
      from: senderEmail,
      to: ownerEmail,
      subject: `New inquiry – ${payload.service} (${payload.city || "City n/a"})`,
      replyTo: payload.email,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
