import { Link } from "react-router-dom";
import { characters, movies } from "../data/marvelData";

export default function Favorites() {
  const favouriteKeys = JSON.parse(
    localStorage.getItem("marvelFavorites") || "[]"
  );

  const favouriteCharacters = characters.filter((character) =>
    favouriteKeys.includes(`character:${character.id}`)
  );

  const favouriteMovies = movies.filter((movie) =>
    favouriteKeys.includes(`movie:${movie.id}`)
  );

  return (
    <main className="page-wrap container">
      <div className="page-heading">
        <p className="section-tag">YOUR PERSONAL COLLECTION</p>

        <h1>
          MY <span>FAVOURITES</span>
        </h1>

        <p>Your saved characters and movies appear here.</p>
      </div>

      {favouriteKeys.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-heart"></i>

          <h3>Your collection is waiting</h3>

          <p>
            Open a character or movie and select "Toggle Favourite" to save it
            here.
          </p>

          <Link className="btn marvel-btn" to="/characters">
            Explore Characters
          </Link>
        </div>
      ) : (
        <>
          <section className="results-section">
            <h2>
              Characters <span>({favouriteCharacters.length})</span>
            </h2>

            <div className="row g-4">
              {favouriteCharacters.map((character) => (
                <div className="col-12 col-sm-6 col-lg-3" key={character.id}>
                  <article className="media-card">
                    <img src={character.image} alt={character.name} />

                    <div className="media-card-body">
                      <h3>{character.name}</h3>

                      <Link
                        className="card-link"
                        to={`/characters/${character.id}`}
                      >
                        View Profile →
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </section>

          <section className="results-section">
            <h2>
              Movies <span>({favouriteMovies.length})</span>
            </h2>

            <div className="row g-4">
              {favouriteMovies.map((movie) => (
                <div className="col-12 col-sm-6 col-lg-3" key={movie.id}>
                  <article className="media-card">
                    <img src={movie.image} alt={movie.title} />

                    <div className="media-card-body">
                      <h3>{movie.title}</h3>

                      <Link
                        className="card-link"
                        to={`/movies/${movie.id}`}
                      >
                        View Movie →
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}