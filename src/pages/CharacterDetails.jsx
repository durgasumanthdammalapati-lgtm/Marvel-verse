import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { characters } from "../data/marvelData";

export default function CharacterDetails() {
  const { id } = useParams();
  const character = characters.find((item) => item.id === id);

  const [favourites, setFavourites] = useState(() =>
    JSON.parse(localStorage.getItem("marvelFavorites") || "[]")
  );

  if (!character) {
    return (
      <main className="page-wrap container">
        <div className="empty-state">
          <h2>Character not found</h2>

          <Link to="/characters" className="btn marvel-btn">
            Back to Characters
          </Link>
        </div>
      </main>
    );
  }

  const favouriteKey = `character:${character.id}`;
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
      <Link to="/characters" className="back-link">
        <i className="bi bi-arrow-left"></i> Back to Characters
      </Link>

      <div className="detail-layout">
        <img
          className="detail-image"
          src={character.image}
          alt={character.name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              "https://placehold.co/600x800/17171c/ffffff?text=Marvel+Character";
          }}
        />

        <div className="detail-content">
          <p className="section-tag">{character.team}</p>

          <h1>{character.name}</h1>

          <p className="detail-subtitle">{character.realName}</p>

          <p className="detail-description">{character.description}</p>

          <div className="detail-fact">
            <span>Universe</span>
            <strong>{character.universe || "Marvel"}</strong>
          </div>

          <div className="detail-fact">
            <span>Team / Affiliation</span>
            <strong>{character.team}</strong>
          </div>

          <div className="detail-fact">
            <span>Known abilities</span>
            <strong>{character.power}</strong>
          </div>

          <div className="detail-fact">
            <span>First appearance</span>
            <strong>{character.debut}</strong>
          </div>

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