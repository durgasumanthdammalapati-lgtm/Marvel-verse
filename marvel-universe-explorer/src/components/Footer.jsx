import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="marvel-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <Link to="/" className="footer-logo">
              MARVEL<span>VERSE</span>
            </Link>

            <p className="footer-description">
              Explore heroes, discover movies, and follow stories from
              across the Marvel Universe.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <h6>Explore</h6>
            <Link to="/characters">Characters</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/timeline">Timeline</Link>
          </div>

          <div className="col-6 col-md-3">
            <h6>Your Space</h6>
            <Link to="/favorites">Favourites</Link>
            <Link to="/search">Search</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Create Account</Link>
          </div>
        </div>

        <hr className="footer-divider" />

        <p className="copyright">
          © {new Date().getFullYear()} Marvel Universe Explorer — an
          unofficial educational fan project.
        </p>

        <p className="copyright">
          Not affiliated with Marvel or Disney. All trademarks and character
          rights belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}