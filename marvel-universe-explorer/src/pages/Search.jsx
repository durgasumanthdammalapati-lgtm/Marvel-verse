import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { characters, movies } from "../data/marvelData";

export default function Search() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      return {
        characters: [],
        movies: [],
      };
    }

    return {
      characters: characters.filter((character) =>
        `${character.name} ${character.realName} ${character.team} ${character.power}`
          .toLowerCase()
          .includes(searchTerm)
      ),

      movies: movies.filter((movie) =>
        `${movie.title} ${movie.year} ${movie.genre}`
          .toLowerCase()
          .includes(searchTerm)
      ),
    };
  }, [query]);

  return (
    <main className="page-wrap container">
      <div className="page-heading">
        <p className="section-tag">FIND YOUR FAVOURITES</p>

        <h1>
          SEARCH THE <span>UNIVERSE</span>
        </h1>

        <p>Search for characters, movies, teams, and more.</p>
      </div>

      <div className="global-search">
        <i className="bi bi-search"></i>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try Iron Man, Avengers, 2019..."
          aria-label="Search the Marvel Universe"
        />
      </div>

      {!query.trim() ? (
        <div className="empty-state">
          <i className="bi bi-compass"></i>
          <h3>What are you looking for?</h3>
          <p>Enter a character or movie title to see results.</p>
        </div>
      ) : (
        <>
          <section className="results-section">
            <h2>
              Characters <span>({results.characters.length})</span>
            </h2>

            <div className="row g-3">
              {results.characters.map((character) => (
                <div className="col-12 col-md-6 col-lg-4" key={character.id}>
                  <Link
                    className="search-result"
                    to={`/characters/${character.id}`}
                  >
                    <img src={character.image} alt="" />

                    <div>
                      <strong>{character.name}</strong>
                      <span>
                        {character.realName} · {character.team}
                      </span>
                    </div>

                    <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="results-section">
            <h2>
              Movies <span>({results.movies.length})</span>
            </h2>

            <div className="row g-3">
              {results.movies.map((movie) => (
                <div className="col-12 col-md-6 col-lg-4" key={movie.id}>
                  <Link
                    className="search-result"
                    to={`/movies/${movie.id}`}
                  >
                    <img src={movie.image} alt="" />

                    <div>
                      <strong>{movie.title}</strong>
                      <span>
                        {movie.year} · Phase {movie.phase}
                      </span>
                    </div>

                    <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {results.characters.length === 0 &&
            results.movies.length === 0 && (
              <div className="empty-state">
                <h3>No results found</h3>
                <p>Try a different search term.</p>
              </div>
            )}
        </>
      )}
    </main>
  );
}