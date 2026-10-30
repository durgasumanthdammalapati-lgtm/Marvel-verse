import { Link } from "react-router-dom";
import { characters, movies, teams } from "../data/marvelData";

export default function Home() {
  const sections = [
    {
      icon: "bi-person-bounding-box",
      title: "Superheroes",
      description: "Discover character profiles, powers, and team connections.",
      link: "/characters",
      action: "Explore Heroes",
    },
    {
      icon: "bi-film",
      title: "Marvel Movies",
      description: "Browse movies and discover their stories.",
      link: "/movies",
      action: "Explore Movies",
    },
    {
      icon: "bi-clock-history",
      title: "MCU Timeline",
      description: "Follow the Marvel movies in release order.",
      link: "/timeline",
      action: "View Timeline",
    },
    {
      icon: "bi-people",
      title: "Marvel Teams",
      description: "Meet the groups that protect Earth and the galaxy.",
      link: "/teams",
      action: "Meet the Teams",
    },
    {
      icon: "bi-heart",
      title: "Your Favourites",
      description: "Keep a personal collection of heroes and movies.",
      link: "/favorites",
      action: "View Favourites",
    },
    {
      icon: "bi-search",
      title: "Discover More",
      description: "Search characters and movies in one place.",
      link: "/search",
      action: "Start Searching",
    },
  ];

  return (
    <>
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <p className="eyebrow">
            <span></span> YOUR GUIDE TO THE MULTIVERSE
          </p>

          <h1>
            EXPLORE THE
            <br />
            <span>MARVEL UNIVERSE</span>
          </h1>

          <p className="hero-description">
            Discover legendary superheroes, iconic movies, powerful teams,
            and the stories that connect them.
          </p>

          <div className="hero-buttons">
            <Link to="/characters" className="btn marvel-btn">
              Explore Characters
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>

            <Link to="/movies" className="btn marvel-outline-btn">
              Discover Movies
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{characters.length}+</strong>
              <span>Heroes</span>
            </div>

            <div>
              <strong>{movies.length}+</strong>
              <span>Movies</span>
            </div>

            <div>
              <strong>{teams.length}+</strong>
              <span>Teams</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <p className="section-tag">CHOOSE YOUR ADVENTURE</p>

            <h2>
              EXPLORE THE <span>UNIVERSE</span>
            </h2>

            <p>
              Everything you need to start exploring, all in one place.
            </p>
          </div>

          <div className="row g-4 mt-2">
            {sections.map((section) => (
              <div
                className="col-12 col-sm-6 col-lg-4"
                key={section.title}
              >
                <article className="explore-card h-100">
                  <div className="card-icon">
                    <i className={`bi ${section.icon}`}></i>
                  </div>

                  <h3>{section.title}</h3>

                  <p>{section.description}</p>

                  <Link to={section.link}>
                    {section.action} <span>→</span>
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div className="container feature-strip-inner">
          <div>
            <p className="section-tag">MADE FOR FANS</p>

            <h2>
              Your Marvel journey,
              <br />
              <span>your way.</span>
            </h2>
          </div>

          <p>
            Save your favourite characters, find movies quickly, and explore
            the universe on any screen — phone, tablet, or computer.
          </p>

          <Link className="btn marvel-btn" to="/signup">
            Join the Explorer
          </Link>
        </div>
      </section>
    </>
  );
}