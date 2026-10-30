import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const message = location.state?.message;

  function handleSubmit(event) {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();

    const accounts = JSON.parse(
      localStorage.getItem("marvelAccounts") || "[]"
    );

    const account = accounts.find(
      (item) =>
        item.email.toLowerCase() === email &&
        item.password === form.password
    );

    if (!account) {
      setError(
        "Email or password is incorrect. If you are new here, create an account first."
      );
      return;
    }

    localStorage.setItem(
      "marvelUser",
      JSON.stringify({
        name: account.name,
        email: account.email,
      })
    );

    window.dispatchEvent(new Event("marvel-auth-changed"));

    navigate(location.state?.from?.pathname || "/", {
      replace: true,
    });
  }

  return (
    <main className="auth-page">
      <div className="container">
        <div className="auth-layout">
          <section className="auth-promo">
            <span className="auth-badge">WELCOME BACK</span>

            <h1>
              YOUR UNIVERSE.
              <br />
              YOUR <span>HEROES.</span>
            </h1>

            <p>
              Sign in to keep exploring heroes, movies, teams, and your
              personal favourites.
            </p>

            <div className="auth-promo-icon">
              <i className="bi bi-shield-shaded"></i>
            </div>

            <Link to="/" className="auth-back-link">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Home
            </Link>
          </section>

          <section className="auth-form-panel">
            <div className="auth-form-container">
              <div className="auth-heading">
                <span className="form-kicker">MEMBER ACCESS</span>

                <h2>Welcome back</h2>

                <p>Enter your details to access your account.</p>
              </div>

              {message && (
                <div className="alert alert-success" role="status">
                  {message}
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="login-email" className="form-label">
                    Email address
                  </label>

                  <input
                    id="login-email"
                    className="form-control auth-input"
                    type="email"
                    value={form.email}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        email: event.target.value,
                      });
                      setError("");
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="login-password" className="form-label">
                    Password
                  </label>

                  <div className="password-wrapper">
                    <input
                      id="login-password"
                      className="form-control auth-input"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(event) => {
                        setForm({
                          ...form,
                          password: event.target.value,
                        });
                        setError("");
                      }}
                      placeholder="Enter your password"
                      autoComplete="current-password"
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

                <button type="submit" className="btn marvel-btn auth-submit">
                  Login to Your Account
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </form>

              <p className="auth-switch">
                Don't have an account? <Link to="/signup">Create Account</Link>
              </p>

              <p className="auth-disclaimer">
                Demo only: account details are stored in this browser. Do not
                use a real or reused password.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}