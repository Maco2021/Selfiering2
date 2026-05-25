import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "9NfFqNnna_yJCCikC";
const EMAILJS_SERVICE_ID = "service_zbye4dn";
const EMAILJS_TEMPLATE_ID = "template_c622k6h";
const RATE_LIMIT_MS = 30000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Initialize EmailJS once at module load (was previously inside a useEffect
// with an empty catch that silently swallowed errors).
try {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
} catch (err) {
  console.warn("EmailJS init failed:", err);
}

function generateToken() {
  const arr = new Uint8Array(24);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (b) => ("0" + b.toString(16)).slice(-2)).join("");
}

function sanitize(str) {
  return str.replace(/<[^>]*>/g, "").trim();
}

function validate({ name, email, message }) {
  if (!name || !email || !message) {
    return "Please fill in all fields.";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
}

function StatusMessage({ msg, type }) {
  return (
    <div
      id="cf-status"
      className={`cf-status ${type ? `cf-status--${type}` : ""}`}
      aria-live="polite"
      data-testid="contact-status"
    >
      {msg}
    </div>
  );
}

function SocialFooter() {
  return (
    <div className="copyright">
      <div className="container">
        <div className="s4">
          <a
            href="https://www.instagram.com/cabinafotoring/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#7b310d" }}
            className="iconbtn fab fa-instagram"
            data-testid="social-instagram"
            aria-label="Instagram @cabinafotoring"
          />
          <a
            href="#"
            style={{ color: "#7b310d" }}
            className="iconbtn fab fa-telegram"
            data-testid="social-telegram"
            aria-label="Telegram"
          />
          <a
            href="#"
            style={{ color: "#7b310d" }}
            className="iconbtn fab fa-viber"
            data-testid="social-viber"
            aria-label="Viber"
          />
        </div>
        <div className="span__text">
          <span style={{ color: "#000" }}>
            Copyright © 2023 SELFIERING. All Rights Reserved SELFIERING
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ContactForm() {
  const formRef = useRef(null);
  const lastSubmitRef = useRef(0);
  // CSRF token kept purely in-memory (was previously sessionStorage).
  // Token is regenerated on mount and after every successful send.
  const csrfRef = useRef(generateToken());
  const [status, setStatus] = useState({ msg: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  const showStatus = (msg, type) => setStatus({ msg, type });

  const checkRateLimit = (now) => {
    const delta = now - lastSubmitRef.current;
    if (delta < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - delta) / 1000);
      showStatus(
        `Please wait ${wait} seconds before sending another message.`,
        "error"
      );
      return false;
    }
    return true;
  };

  const sendEmail = (form) => {
    setSubmitting(true);
    showStatus("Sending…", "info");
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        showStatus("Message sent! We'll get back to you soon. ✓", "success");
        form.reset();
        csrfRef.current = generateToken();
        const csrfEl = form.querySelector("#cf-csrf");
        if (csrfEl) csrfEl.value = csrfRef.current;
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        showStatus("Something went wrong. Please try again.", "error");
      })
      .finally(() => setSubmitting(false));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Honeypot — bots fill it; humans don't.
    if (form.querySelector("#cf-honeypot").value !== "") {
      showStatus("Message sent! We'll get back to you soon. ✓", "success");
      form.reset();
      return;
    }

    // CSRF — submitted field must match in-memory token from this render.
    if (form.querySelector("#cf-csrf").value !== csrfRef.current) {
      showStatus(
        "Security check failed. Please refresh the page and try again.",
        "error"
      );
      return;
    }

    const now = Date.now();
    if (!checkRateLimit(now)) return;

    const nameEl = form.querySelector("#cf-name");
    const emailEl = form.querySelector("#cf-email");
    const messageEl = form.querySelector("#cf-message");

    const name = sanitize(nameEl.value);
    const email = sanitize(emailEl.value);
    const message = sanitize(messageEl.value);

    const error = validate({ name, email, message });
    if (error) {
      showStatus(error, "error");
      return;
    }

    nameEl.value = name;
    emailEl.value = email;
    messageEl.value = message;

    lastSubmitRef.current = now;
    sendEmail(form);
  };

  // Sync the hidden CSRF input with the current token on mount.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const csrfEl = form.querySelector("#cf-csrf");
    if (csrfEl) csrfEl.value = csrfRef.current;
  }, []);

  return (
    <div className="container">
      <div
        className="contact-section"
        id="contacte"
        data-testid="contact-section"
        style={{
          background: "url(/img/footer.webp) no-repeat center",
          backgroundSize: "cover",
        }}
      >
        <div className="contact-section h1">
          <h1>
            <img
              style={{ width: 200 }}
              src="/img/fblock/cu.webp"
              alt="contact"
            />
          </h1>
        </div>
        <form
          className="contact-form"
          id="contactForm"
          noValidate
          ref={formRef}
          onSubmit={onSubmit}
          data-testid="contact-form"
        >
          <input
            type="text"
            id="cf-honeypot"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: 1,
              height: 1,
              opacity: 0,
            }}
          />
          <input
            type="hidden"
            id="cf-csrf"
            name="csrf_token"
            defaultValue={csrfRef.current}
          />

          <input
            type="text"
            id="cf-name"
            name="from_name"
            className="contact-form-text"
            placeholder="Your name"
            required
            data-testid="contact-name"
          />
          <input
            type="email"
            id="cf-email"
            name="from_email"
            className="contact-form-text"
            placeholder="Your email"
            required
            data-testid="contact-email"
          />
          <textarea
            id="cf-message"
            name="message"
            className="contact-form-text"
            placeholder="Your message"
            required
            data-testid="contact-message"
          />
          <StatusMessage msg={status.msg} type={status.type} />
          <input
            type="submit"
            value=""
            id="cf-submit"
            className="contact-form-btn"
            disabled={submitting}
            data-testid="contact-submit"
            style={{
              transition: "opacity 0.2s linear",
              background: "url(/img/fblock/send.webp) no-repeat center",
              opacity: submitting ? 0.4 : 0.75,
            }}
          />
          <div>
            <SocialFooter />
          </div>
        </form>
      </div>
    </div>
  );
}
