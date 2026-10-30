import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (form.password.length < 8) {
      setError("Your password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    const accounts = JSON.parse(
      localStorage.getItem("marvelAccounts") || "[]"
    );

    const alreadyExists = accounts.some(
      (account) => account.email.toLowerCase() === email
    );

    if (alreadyExists) {
      setError("An account with this email already exists. Please log in.");
      return;
    }

    accounts.push({
      name,
      email,
      password: form.password,
    });

    localStorage.setItem("marvelAccounts", JSON.stringify(accounts));

    navigate("/login", {
      state: {
        message: "Account created successfully! Please log in.",
      },
    });
  }

  return (
    <main className="auth-page">
      <div className="container">
        <div className="auth-layout signup-layout">
          <section className="auth-promo">
            <span className="auth-badge">JOIN THE UNIVERSE</span>

            <h1>
              YOUR NEXT
              <br />
              <span>ADVENTURE</span>
              <br />
              STARTS HERE.
            </h1>

            <p>
              Create your account to collect favourites and explore stories
              from across the Marvel Universe.
            </p>

            <div className="auth-promo-icon">
              <i className="bi bi-stars"></i>
            </div>

            <Link to="/" className="auth-back-link">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Home
            </Link>
          </section>

          <section className="auth-form-panel">
            <div className="auth-form-container">
              <div className="auth-heading">
                <span className="form-kicker">BECOME A MEMBER</span>

                <h2>Create account</h2>

                <p>Fill in the details below to get started.</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="signup-name" className="form-label">
                    Full name
                  </label>

                  <input
                    id="signup-name"
                    className="form-control auth-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="signup-email" className="form-label">
                    Email address
                  </label>

                  <input
                    id="signup-email"
                    className="form-control auth-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="signup-password" className="form-label">
                    Password
                  </label>

                  <div className="password-wrapper">
                    <input
                      id="signup-password"
                      className="form-control auth-input"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="signup-confirm" className="form-label">
                    Confirm password
                  </label>

                  <div className="password-wrapper">
                    <input
                      id="signup-confirm"
                      className="form-control auth-input"
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Enter your password again"
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirm(!showConfirm)}
                      aria-label={
                        showConfirm
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      <i
                        className={`bi ${
                          showConfirm ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn marvel-btn auth-submit">
                  Create My Account
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </form>

              <p className="auth-switch">
                Already have an account? <Link to="/login">Login</Link>
              </p>

              <p className="auth-disclaimer">
                Demo registration only. Details are stored locally in this
                browser.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}