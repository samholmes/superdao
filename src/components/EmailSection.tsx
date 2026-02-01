import { createSignal } from "solid-js";
import "./EmailSection.css";

export default function EmailSection() {
  const [email, setEmail] = createSignal("");
  const [submitted, setSubmitted] = createSignal(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (email()) {
      setSubmitted(true);
      // TODO: Send email to backend
      console.log("Email submitted:", email());
    }
  };

  return (
    <section class="email-section">
      <div class="email-content">
        <h2 class="email-title">Get Early Access</h2>
        <p class="email-subtitle">By invitation only. Reserve your spot.</p>
        
        {!submitted() ? (
          <form class="email-form" onSubmit={handleSubmit}>
            <input
              type="email"
              class="email-input"
              placeholder="Enter your email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <button type="submit" class="email-button">
              Request Access
            </button>
          </form>
        ) : (
          <div class="success-message">
            <p>You're on the list. We'll be in touch.</p>
          </div>
        )}
      </div>
    </section>
  );
}
