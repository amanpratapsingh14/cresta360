"use client";

import { useCallback, useEffect, useState } from "react";

const NAME_REGEX = /^[A-Za-z\s]+$/;
const PHONE_REGEX = /^\+\d{12}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const serviceOptions = [
  "Modular Kitchen",
  "Wardrobe / Walk-in",
  "TV Panel",
  "Bathroom Vanity",
  "Full Home Interiors",
];

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle" });
  const [formDurationStart] = useState(Date.now());
  const [challenge, setChallenge] = useState({ prompt: "Loading challenge…", token: "" });
  const [challengeLoading, setChallengeLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: serviceOptions[0],
    message: "",
    challengeAnswer: "",
    preferredTime: "",
  });

  const isSubmitting = status.state === "pending";

  const fetchChallenge = useCallback(async () => {
    try {
      setChallengeLoading(true);
      const response = await fetch("/api/bot-challenge", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load challenge");
      }
      const data = await response.json();
      setChallenge({ prompt: data.prompt, token: data.token });
    } catch (error) {
      console.error("Challenge load error:", error);
      setChallenge({ prompt: "Challenge unavailable. Please try again.", token: "" });
    } finally {
      setChallengeLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.preferredTime) {
      return;
    }

    if (!NAME_REGEX.test(formData.name.trim())) {
      setStatus({ state: "error", message: "Name must contain only letters and spaces." });
      return;
    }

    if (!PHONE_REGEX.test(formData.phone.trim())) {
      setStatus({ state: "error", message: "Phone must start with + and include 12 digits (e.g., +911234567890)." });
      return;
    }

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setStatus({ state: "error", message: "Email must be a valid Gmail address." });
      return;
    }

    if (!challenge.token) {
      setStatus({ state: "error", message: "Bot challenge unavailable. Please refresh the question and try again." });
      await fetchChallenge();
      return;
    }

    setStatus({ state: "pending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          challengeToken: challenge.token,
          formDuration: Date.now() - formDurationStart,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      setStatus({ state: "success", message: "Request submitted. We’ll be in touch shortly." });
      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        service: serviceOptions[0],
        message: "",
        challengeAnswer: "",
        preferredTime: "",
      });
    } catch (error) {
      setStatus({ state: "error", message: error.message || "Failed to submit form" });
    }
    setFormData((prev) => ({ ...prev, challengeAnswer: "" }));
    await fetchChallenge();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label>
          Full name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            pattern="^[A-Za-z\s]+$"
            title="Only alphabets and spaces are allowed."
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+911234567890"
            required
            pattern="^\+\d{12}$"
            title="Start with + followed by a 12-digit number (e.g., +911234567890)."
          />
        </label>
      </div>

      <div className="form__row">
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@email.com"
            required
            pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
            title="Use a valid Gmail address (example@gmail.com)."
          />
        </label>
        <label>
          City
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Noida / Delhi / Gurgaon"
          />
        </label>
      </div>

      <div className="form__row">
        <label>
          Service
          <select name="service" value={formData.service} onChange={handleChange}>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label aria-hidden="true" className="bot-field">
          Preferred time
          <input
            type="text"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label>
        Message
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Share size, style, and your budget range..."
          required
        />
      </label>

      <div className="form__row bot-challenge">
        <label>
          {challenge.prompt}
          <input
            type="text"
            name="challengeAnswer"
            value={formData.challengeAnswer}
            onChange={handleChange}
            placeholder="Your answer"
            required
            disabled={!challenge.token}
          />
        </label>
        {/* <button
          className="btn btn--ghost btn--sm"
          type="button"
          onClick={fetchChallenge}
          disabled={challengeLoading}
        >
          {challengeLoading ? "Refreshing…" : "New question"}
        </button> */}
      </div>

      <div className="form__actions">
        <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Request callback"}
        </button>
        <p className="fineprint">
          {status.state === "success" && <span className="form-status form-status--success">{status.message}</span>}
          {status.state === "error" && <span className="form-status form-status--error">{status.message}</span>}
          {status.state === "idle" && "By submitting, you agree to be contacted by our team."}
        </p>
      </div>
    </form>
  );
}
