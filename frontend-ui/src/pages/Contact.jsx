import React, { useState } from "react";
import Icon from "../components/Icon.jsx";
export default function Contact({ settings }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  async function submit(e) {
    e.preventDefault();
    if (!accessKey || status === "sending") return;
    const form = e.currentTarget;
    const fields = new FormData(form);
    if (fields.get("botcheck")) return;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "Multiscale Lab website enquiry",
          from_name: "Multiscale Lab website",
          name: fields.get("name"),
          email: fields.get("email"),
          message: fields.get("message"),
          botcheck: fields.get("botcheck"),
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success)
        throw new Error(
          "Your message could not be sent. Please try again shortly.",
        );
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }
  return (
    <div className="contact-layout">
      <div className="contact-information">
        <span className="eyebrow">VISIT THE LAB</span>
        <h2>
          Let’s start
          <br />a conversation.
        </h2>
        <p>
          For research enquiries, collaboration and information about the lab.
        </p>
        <div className="contact-item">
          <Icon name="pin" />
          <div>
            <h3>Find us</h3>
            <address>
              {settings.address.map((x, i) => (
                <React.Fragment key={i}>
                  {x}
                  <br />
                </React.Fragment>
              ))}
            </address>
          </div>
        </div>
        <div className="contact-item">
          <Icon name="mail" />
          <div>
            <h3>Email the lab</h3>
            {settings.email ? (
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            ) : (
              <p>Official email to be confirmed</p>
            )}
          </div>
        </div>
        {settings.phone && (
          <div className="contact-item">
            <span>Phone</span>
            <p>{settings.phone}</p>
          </div>
        )}
        {settings.labHead && (
          <div className="contact-item">
            <span>Lab head</span>
            <p>{settings.labHead}</p>
          </div>
        )}
      </div>
      <form className="contact-form" onSubmit={submit}>
        <span className="eyebrow">SEND AN ENQUIRY</span>
        <h3>What would you like to explore?</h3>
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength="120"
            placeholder="Full name"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength="254"
            placeholder="you@example.com"
          />
        </label>
        <label>
          Your message
          <textarea
            name="message"
            required
            minLength="10"
            maxLength="5000"
            rows="5"
            placeholder="Tell us a little about your enquiry"
          />
        </label>
        <input
          className="honeypot"
          type="checkbox"
          name="botcheck"
          tabIndex="-1"
          aria-hidden="true"
        />
        <p className="form-notice">
          {accessKey ? (
            <span>
              By sending this form, you agree to the processing of your enquiry
              as described in our <a href="/privacy/">privacy notice</a>.
            </span>
          ) : (
            "The form will open when the lab confirms its official contact email."
          )}
        </p>
        <button
          className="button primary"
          type="submit"
          disabled={!accessKey || status === "sending"}
        >
          {status === "sending" ? "Sending your message" : "Send enquiry"}
          <Icon name={status === "sending" ? "atom" : "upRight"} />
        </button>
        <p
          role="status"
          aria-live="polite"
          className={status === "error" ? "form-error" : "form-success"}
        >
          {status === "success"
            ? "Your message has been sent. Thank you for contacting the lab."
            : error}
        </p>
      </form>
    </div>
  );
}
