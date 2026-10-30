import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { movies } from "../data/marvelData";

export default function MovieDetails() {
  const { id } = useParams();
  const movie = movies.find((item) => item.id === id);

  const [favourites, setFavourites] = useState(() =>
    JSON.parse(localStorage.getItem("marvelFavorites") || "[]")
  );

  if (!movie) {
    return (
      <main className="page-wrap container">
        <div className="empty-state">
          <h2>Movie not found</h2>

          <Link to="/movies" className="btn marvel-btn">
            Back to Movies
          </Link>
        </div>
      </main>
    );
  }

  const favouriteKey = `movie:${movie.id}`;
  const isFavourite = favourites.includes(favouriteKey);

  function toggleFavourite() {
    const updated = isFavourite
      ? favourites.filter((item) => item !== favouriteKey)
      : [...favourites, favouriteKey];

    localStorage.setItem("marvelFavorites", JSON.stringify(updated));
    setFavourites(updated);
  }

  return (
    <main className="page-wrap container">
      <Link to="/movies" className="back-link">
        <i className="bi bi-arrow-left"></i> Back to Movies
      </Link>

      <div className="detail-layout">
        <img
          className="detail-image"
          src={movie.image}
          alt={movie.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "https://placehold.co/600x800/17171c/ffffff?text=Marvel+Movie";
          }}
        />

        <div className="detail-content">
          <p className="section-tag">{movie.universe}</p>

          <h1>{movie.title}</h1>

          <p className="detail-subtitle">
            {movie.year}
            {movie.phase > 0 ? ` · MCU Phase ${movie.phase}` : ""}
          </p>

          <p className="detail-description">{movie.description}</p>

          <div className="detail-fact">
            <span>Release year</span>
            <strong>{movie.year}</strong>
          </div>

          <div className="detail-fact">
            <span>Universe / Continuity</span>
            <strong>{movie.universe}</strong>
          </div>

          <div className="detail-fact">
            <span>Genre</span>
            <strong>{movie.genre}</strong>
          </div>

          {movie.phase > 0 && (
            <div className="detail-fact">
              <span>MCU Phase</span>
              <strong>{movie.phase}</strong>
            </div>
          )}

          <button
            className="btn marvel-btn mt-4"
            onClick={toggleFavourite}
          >
            <i
              className={`bi ${
                isFavourite ? "bi-heart-fill" : "bi-heart"
              } me-2`}
            ></i>
            {isFavourite ? "Remove Favourite" : "Add to Favourites"}
          </button>
        </div>
      </div>
    </main>
  );
}