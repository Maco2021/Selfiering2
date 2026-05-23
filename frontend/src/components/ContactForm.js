import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "9NfFqNnna_yJCCikC";
const EMAILJS_SERVICE_ID = "service_zbye4dn";
const EMAILJS_TEMPLATE_ID = "template_c622k6h";
const RATE_LIMIT_MS = 30000;

function generateToken() {
  const arr = new Uint8Array(24);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (b) => ("0" + b.toString(16)).slice(-2)).join("");
}

function sanitize(str) {
  return str.replace(/<[^>]*>/g, "").trim();
}

export default function ContactForm() {
  const formRef = useRef(null);
  const lastSubmitRef = useRef(0);
  const [csrfToken, setCsrfToken] = useState("");
  const [status, setStatus] = useState({ msg: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    } catch (e) {
      // ignore
    }
    let token = sessionStorage.getItem("csrf_token");
    if (!token) {
      token = generateToken();
      sessionStorage.setItem("csrf_token", token);
    }
    setCsrfToken(token);
  }, []);

  const showStatus = (msg, type) => setStatus({ msg, type });

  const onSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    // Honeypot
    const honeypot = form.querySelector("#cf-honeypot").value;
    if (honeypot !== "") {
      showStatus("Message sent! We'll get back to you soon. ✓", "success");
      form.reset();
      return;
    }

    // CSRF
    const stored = sessionStorage.getItem("csrf_token");
    const submitted = form.querySelector("#cf-csrf").value;
    if (!stored || submitted !== stored) {
      showStatus(
        "Security check failed. Please refresh the page and try again.",
        "error"
      );
      return;
    }

    // Rate limit
    const now = Date.now();
    if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
      const wait = Math.ceil(
        (RATE_LIMIT_MS - (now - lastSubmitRef.current)) / 1000
      );
      showStatus(
        `Please wait ${wait} seconds before sending another message.`,
        "error"
      );
      return;
    }

    const nameEl = form.querySelector("#cf-name");
    const emailEl = form.querySelector("#cf-email");
    const messageEl = form.querySelector("#cf-message");

    const name = sanitize(nameEl.value);
    const email = sanitize(emailEl.value);
    const message = sanitize(messageEl.value);

    if (!name || !email || !message) {
      showStatus("Please fill in all fields.", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    nameEl.value = name;
    emailEl.value = email;
    messageEl.value = message;

    lastSubmitRef.current = now;
    setSubmitting(true);
    showStatus("Sending…", "info");

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        showStatus("Message sent! We'll get back to you soon. ✓", "success");
        form.reset();
        const newToken = generateToken();
        sessionStorage.setItem("csrf_token", newToken);
        setCsrfToken(newToken);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        showStatus("Something went wrong. Please try again.", "error");
      })
      .finally(() => setSubmitting(false));
  };

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
            defaultValue={csrfToken}
            key={csrfToken}
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
          <div
            id="cf-status"
            className={`cf-status ${status.type ? `cf-status--${status.type}` : ""}`}
            aria-live="polite"
            data-testid="contact-status"
          >
            {status.msg}
          </div>
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
            <div className="copyright">
              <div className="container">
                <div className="s4">
                  <a
                    href="#"
                    style={{ color: "#7b310d" }}
                    className="iconbtn fab fa-facebook"
                    data-testid="social-facebook"
                  />
                  <a
                    href="#"
                    style={{ color: "#7b310d" }}
                    className="iconbtn fab fa-telegram"
                    data-testid="social-telegram"
                  />
                  <a
                    href="#"
                    style={{ color: "#7b310d" }}
                    className="iconbtn fab fa-viber"
                    data-testid="social-viber"
                  />
                </div>
                <div className="span__text">
                  <span style={{ color: "#000" }}>
                    Copyright © 2023 SELFIERING. All Rights Reserved
                    SELFIERING
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
