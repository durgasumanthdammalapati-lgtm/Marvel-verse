import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Timeline from "./pages/Timeline";
import Teams from "./pages/Teams";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function NotFound() {
  return (
    <main className="page-wrap container">
      <div className="empty-state">
        <i className="bi bi-compass"></i>

        <h1>Page Not Found</h1>

        <p>The page you are looking for does not exist.</p>

        <a href="/" className="btn marvel-btn">
          Back to Home
        </a>
      </div>
    </main>
  );
}

function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/characters" element={<Characters />} />

          <Route
            path="/characters/:id"
            element={<CharacterDetails />}
          />

          <Route path="/movies" element={<Movies />} />

          <Route path="/movies/:id" element={<MovieDetails />} />

          <Route path="/timeline" element={<Timeline />} />

          <Route path="/teams" element={<Teams />} />

          <Route path="/search" element={<Search />} />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}