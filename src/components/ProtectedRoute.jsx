import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("marvelUser") || "null");

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          message: "Please log in to view your favourites.",
        }}
      />
    );
  }

  return children;
}