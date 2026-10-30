import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { movies } from "../data/marvelData";

const timelineOptions = [
  {
    value: "mcu-release",
    label: "MCU Release Order",
    description: "Watch MCU movies in their original release order.",
  },
  {
    value: "mcu-chronological",
    label: "MCU Chronological Order",
    description: "A suggested order based on the stories' in-universe events.",
  },
  {
    value: "x-men",
    label: "X-Men Timeline",
    description: "Explore the X-Men film series separately.",
  },
  {
    value: "spider-man",
    label: "Spider-Man Timeline",
    description: "Explore the different live-action Spider-Man series.",
  },
];

export default function Timeline() {
  const [selectedTimeline, setSelectedTimeline] = useState("mcu-release");

  const timelineMovies = useMemo(() => {
    let result = [];

    switch (selectedTimeline) {
      case "mcu-release":
        result = movies.filter((movie) => movie.phase > 0);
        return result.sort((a, b) => a.order - b.order);

      case "mcu-chronological":
        result = movies.filter((movie) => movie.phase > 0);
        return result.sort(
          (a, b) => a.timelineOrder - b.timelineOrder
        );

      case "x-men":
        result = movies.filter((movie) => movie.universe === "X-Men");
        return result.sort((a, b) => a.order - b.order);

      case "spider-man":
        result = movies.filter(
          (movie) =>
            movie.universe === "Raimi Spider-Man" ||
            movie.universe === "Amazing Spider-Man" ||
            movie.id === "spider-man-homecoming" ||
            movie.id === "spider-man-far-from-home" ||
            movie.id === "spider-man-no-way-home"
        );
        return result.sort((a, b) => a.year - b.year);

      default:
        return [];
    }
  }, [selectedTimeline]);

  const currentOption = timelineOptions.find(
    (option) => option.value === selectedTimeline
  );

  return (
    <main className="page-wrap container">
      <div className="page-heading">
        <p className="section-tag">YOUR MARVEL MARATHON</p>

        <h1>
          MOVIE <span>TIMELINES</span>
        </h1>

        <p>
          Choose a viewing order and follow the stories across Marvel's
          different movie continuities.
        </p>
      </div>

      <div className="timeline-selector">
        <label htmlFor="timeline-choice" className="form-label">
          Select a timeline
        </label>

        <select
          id="timeline-choice"
          className="form-select team-select"
          value={selectedTimeline}
          onChange={(event) => setSelectedTimeline(event.target.value)}
        >
          {timelineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <p className="timeline-description">
          {currentOption?.description}
        </p>
      </div>

      <div className="timeline-summary">
        <span className="section-tag">VIEWING GUIDE</span>
        <h2>{currentOption?.label}</h2>
        <p>
          {timelineMovies.length} movies in this list. Select a movie to
          explore its details.
        </p>
      </div>

      {timelineMovies.length > 0 ? (
        <div className="timeline-list">
          {timelineMovies.map((movie, index) => (
            <article className="timeline-item" key={movie.id}>
              <div className="timeline-marker">
                <span>{index + 1}</span>
              </div>

              <div className="timeline-card">
                <img
                  src={movie.image}
                  alt={movie.title}
                  loading="lazy"
                />

                <div className="timeline-card-content">
                  <span className="card-kicker">
                    {movie.year} · {movie.universe}
                  </span>

                  <h3>{movie.title}</h3>

                  <p>{movie.description}</p>

                  <Link
                    to={`/movies/${movie.id}`}
                    className="card-link"
                  >
                    Movie Details{" "}
                    <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No movies available</h3>
          <p>Try selecting another timeline.</p>
        </div>
      )}

      <div className="timeline-note">
        <i className="bi bi-info-circle"></i>
        <p>
          <strong>Viewing-order note:</strong> Release order follows the
          film catalogue's release sequence. Chronological order is an
          approximate guide, as some stories overlap, use flashbacks, or
          involve alternate timelines. X-Men and Spider-Man continuities
          are displayed separately where possible.
        </p>
      </div>
    </main>
  );
}