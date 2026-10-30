import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { movies } from "../data/marvelData";

export default function Movies() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState("All");
  const [universe, setUniverse] = useState("All");

  const universes = [
    "All",
    ...new Set(movies.map((movie) => movie.universe)),
  ];

  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        const searchText = `${movie.title} ${movie.universe} ${movie.genre}`
          .toLowerCase();

        const matchesSearch = searchText.includes(query.toLowerCase());

        const matchesPhase =
          phase === "All" || String(movie.phase) === phase;

        const matchesUniverse =
          universe === "All" || movie.universe === universe;

        return matchesSearch && matchesPhase && matchesUniverse;
      })
      .sort((a, b) => a.order - b.order);
  }, [query, phase, universe]);

  return (
    <main className="page-wrap container">
      <div className="page-heading">
        <p className="section-tag">FROM THE BIG SCREEN</p>

        <h1>
          MARVEL <span>MOVIES</span>
        </h1>

        <p>
          Explore MCU films, X-Men movies, Spider-Man movies, and other
          Marvel adaptations.
        </p>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <i className="bi bi-search"></i>

          <input
            className="form-control"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies..."
            aria-label="Search movies"
          />
        </div>

        <select
          className="form-select team-select"
          value={phase}
          onChange={(event) => setPhase(event.target.value)}
          aria-label="Filter by phase"
        >
          <option value="All">All Phases / Collections</option>
          <option value="1">MCU Phase 1</option>
          <option value="2">MCU Phase 2</option>
          <option value="3">MCU Phase 3</option>
          <option value="4">MCU Phase 4</option>
          <option value="5">MCU Phase 5</option>
          <option value="6">MCU Phase 6</option>
          <option value="0">Other Marvel Films</option>
        </select>

        <select
          className="form-select team-select"
          value={universe}
          onChange={(event) => setUniverse(event.target.value)}
          aria-label="Filter by universe"
        >
          {universes.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Universes" : item}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4">
        Showing <strong>{filteredMovies.length}</strong> movies
      </p>

      <div className="row g-4">
        {filteredMovies.map((movie) => (
          <div className="col-12 col-sm-6 col-lg-4" key={movie.id}>
            <article className="media-card movie-card">
              <img
                src={movie.image}
                alt={movie.title}
                loading="lazy"
              />

              <div className="media-card-body">
                <div className="movie-meta">
                  <span>{movie.year}</span>
                  <span>
                    {movie.phase > 0
                      ? `MCU Phase ${movie.phase}`
                      : movie.universe}
                  </span>
                </div>

                <h3>{movie.title}</h3>

                <p>{movie.genre}</p>

                <Link
                  className="card-link"
                  to={`/movies/${movie.id}`}
                >
                  Movie Details <i className="bi bi-arrow-up-right"></i>
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <div className="empty-state">
          <h3>No movies found</h3>
          <p>Try another title, phase, or universe.</p>
        </div>
      )}
    </main>
  );
}