import { Link } from "react-router-dom";
import { teams } from "../data/marvelData";

export default function Teams() {
  return (
    <main className="page-wrap container">
      <div className="page-heading">
        <p className="section-tag">BETTER TOGETHER</p>

        <h1>
          MARVEL <span>TEAMS</span>
        </h1>

        <p>
          Meet the heroes, teams, and villains across Marvel's different
          universes.
        </p>
      </div>

      <div className="row g-4">
        {teams.map((team) => (
          <div className="col-12 col-md-6 col-lg-4" key={team.id}>
            <article className="team-card">
              <div className="team-icon">
                <i className={`bi ${team.icon}`}></i>
              </div>

              <p className="section-tag">TEAM FILE</p>

              <h2>{team.name}</h2>

              <p>{team.description}</p>

              <div className="team-members">
                <strong>Members / Affiliation</strong>
                <span>{team.members}</span>
              </div>

              <Link
                to={`/characters?team=${encodeURIComponent(
                  team.characterTeam
                )}`}
                className="card-link"
              >
                Explore team members{" "}
                <i className="bi bi-arrow-up-right"></i>
              </Link>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}