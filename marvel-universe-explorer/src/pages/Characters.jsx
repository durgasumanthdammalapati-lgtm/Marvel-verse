import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { characters } from "../data/marvelData";

export default function Characters() {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const team = searchParams.get("team") || "All";

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const searchableText = [
        character.name,
        character.realName,
        character.team,
        character.universe,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query.toLowerCase());
      const matchesTeam = team === "All" || character.team === team;

      return matchesSearch && matchesTeam;
    });
  }, [query, team]);

  const teams = ["All", ...new Set(characters.map((c) => c.team))];

  // If a URL contains a team that doesn't exist, return to All.
  useEffect(() => {
    if (team !== "All" && !teams.includes(team)) {
      setSearchParams({});
    }
  }, [team, teams, setSearchParams]);

  function handleTeamChange(event) {
    const value = event.target.value;

    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ team: value });
    }
  }

  return (
    <main className="page-wrap container">
      <div className="page-heading">
        <p className="section-tag">MEET THE LEGENDS</p>

        <h1>
          MARVEL <span>CHARACTERS</span>
        </h1>

        <p>
          Discover heroes, their abilities, and their place in the universe.
        </p>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <i className="bi bi-search"></i>

          <input
            className="form-control"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search characters..."
            aria-label="Search characters"
          />
        </div>

        <select
          className="form-select team-select"
          value={team}
          onChange={handleTeamChange}
          aria-label="Filter by team"
        >
          {teams.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Teams" : item}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-4">
        Showing <strong>{filteredCharacters.length}</strong>{" "}
        {filteredCharacters.length === 1 ? "character" : "characters"}
        {team !== "All" ? ` in ${team}` : ""}
      </p>

      <div className="row g-4">
        {filteredCharacters.map((character) => (
          <div
            className="col-12 col-sm-6 col-lg-4 col-xl-3"
            key={character.id}
          >
            <article className="media-card character-card">
              <img
                src={character.image}
                alt={character.name}
                loading="lazy"
              />

              <div className="media-card-body">
                <span className="card-kicker">{character.team}</span>

                <h3>{character.name}</h3>

                <p>{character.power}</p>

                <Link
                  className="card-link"
                  to={`/characters/${character.id}`}
                >
                  View Profile <i className="bi bi-arrow-up-right"></i>
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="empty-state">
          <i className="bi bi-search"></i>
          <h3>No characters found</h3>
          <p>Try another search or team filter.</p>
        </div>
      )}
    </main>
  );
}