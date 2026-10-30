import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("marvelUser") || "null")
  );

  useEffect(() => {
    const refreshUser = () => {
      setUser(JSON.parse(localStorage.getItem("marvelUser") || "null"));
    };

    window.addEventListener("marvel-auth-changed", refreshUser);
    window.addEventListener("storage", refreshUser);

    return () => {
      window.removeEventListener("marvel-auth-changed", refreshUser);
      window.removeEventListener("storage", refreshUser);
    };
  }, []);

  function closeMenu() {
    const menu = document.getElementById("marvelNavbar");

    if (menu?.classList.contains("show") && window.bootstrap?.Collapse) {
      window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  }

  function logout() {
    localStorage.removeItem("marvelUser");

    window.dispatchEvent(new Event("marvel-auth-changed"));

    closeMenu();
    navigate("/");
  }

  const navItems = [
    ["/", "Home"],
    ["/characters", "Characters"],
    ["/movies", "Movies"],
    ["/timeline", "Timeline"],
    ["/teams", "Teams"],
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark marvel-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand marvel-logo" to="/" onClick={closeMenu}>
          MARVEL<span>VERSE</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#marvelNavbar"
          aria-controls="marvelNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="marvelNavbar">
          <div className="navbar-nav ms-auto align-items-lg-center">
            {navItems.map(([to, label]) => (
              <NavLink
                key={to}
                className="nav-link"
                to={to}
                onClick={closeMenu}
                end={to === "/"}
              >
                {label}
              </NavLink>
            ))}

            <NavLink
              className="nav-link"
              to="/favorites"
              onClick={closeMenu}
            >
              <i className="bi bi-heart me-1"></i>
              Favourites
            </NavLink>

            <NavLink
              className="nav-link"
              to="/search"
              onClick={closeMenu}
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
            </NavLink>

            {user ? (
              <>
                <span className="nav-user d-none d-lg-inline">
                  Hi, {user.name.split(" ")[0]}
                </span>

                <button
                  className="btn marvel-outline-btn nav-auth-button"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>

                <Link
                  className="btn marvel-btn nav-auth-button"
                  to="/signup"
                  onClick={closeMenu}
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}